const fs = require('fs')
const path = require('path')
const LRU = require('lru-cache')
const express = require('express')
const compression = require('compression')
const favicon = require('serve-favicon')
const resolve = file => path.resolve(__dirname, file)
const {createBundleRenderer} = require('vue-server-renderer')
const htmlHeadConfig = require('./config/html-head-config')
const cookieParser = require('cookie-parser')
const config = require('./config')
const isProd = process.env.NODE_ENV === 'production'
const serverInfo =
    `express/${require('express/package.json').version} ` +
    `vue-server-renderer/${require('vue-server-renderer/package.json').version}`

const app = express()
const template = fs.readFileSync(resolve('./src/index.template.html'), 'utf-8')

// 全局接口缓存块
global.apiCache = LRU({
  maxAge: 10000 // 条目在 10 秒后过期。
})

app.use(cookieParser())

function createRenderer (bundle, options) {
  // https://github.com/vuejs/vue/blob/dev/packages/vue-server-renderer/README.md#why-use-bundlerenderer
  return createBundleRenderer(bundle, Object.assign(options, {
    template,
    // for component caching
    cache: LRU({
      max: 1000,
      maxAge: 1000 * 60 * 15
    }),
    // this is only needed when vue-server-renderer is npm-linked
    basedir: resolve('./dist'),
    // recommended for performance
    runInNewContext: false
  }))
}

let renderer
let readyPromise
if (isProd) {
  const bundle = require('./dist/vue-ssr-server-bundle.json')
  const clientManifest = require('./dist/vue-ssr-client-manifest.json')
  renderer = createRenderer(bundle, {
    clientManifest
  })
} else {
  readyPromise = require('./build/setup-dev-server')(app, (bundle, options) => {
    renderer = createRenderer(bundle, options)
  })
}

const serve = (path, cache) => express.static(resolve(path), {
  maxAge: cache && isProd ? 1000 * 60 * 60 * 24 * 30 : 0
})

app.use(compression({
  threshold: 0
}))
app.use('/manifest.json', serve('./manifest.json', true))

app.use('/dist', serve('./dist', true))
app.use('./public', serve('./public', true))
app.use(favicon('./public/favicon.png'))

function render (req, res) {
  const s = Date.now()
  res.setHeader('Content-Type', 'text/html')
  res.setHeader('Server', serverInfo)

  const handleError = err => {
    if (err.url) {
      res.redirect(err.url)
    } else if (err.code === 404) {
      res.status(404).end(fs.readFileSync(resolve('./src/404.template.html'), 'utf-8'))
    } else {
      // Render Error Page or Redirect
      res.end(fs.readFileSync(resolve('./src/500.template.html'), 'utf-8'))
      console.error(`error during render : ${req.url}`)
      console.error(err.stack)
    }
  }

  global._config = {
    apiServer: config.apiServer,
    domain: config.domain,
    authorizeAddress: config.authorizeAddress,
  }
  const context = {
    url: req.url,
    isLogined: Boolean(req.cookies && req.cookies.__wpt),
    htmlHeadConfig,
    req,
    res,
    authorizeAddress: _config.authorizeAddress,
    _config: JSON.stringify(_config), // #与模版通信 发送
  }

  global.context = context

  if (req.cookies['__wpt']) {
    global.cookies = {
      __wpt: req.cookies['__wpt']
    }
  } else {
    global.cookies = {
      __wpt: ''
    }
  }
  renderer.renderToString(context, (err, html) => {
    if (err) {
      return handleError(err)
    }
    res.end(html)
    if (!isProd) {
      console.log(`whole request: ${Date.now() - s}ms`)
    }
  })
}

app.get('*', isProd ? render : (req, res) => {
  readyPromise.then(() => render(req, res))
})

const port = process.env.PORT || 8071
app.listen(port, () => {
  console.log(`server started at localhost:${port}`)
})
