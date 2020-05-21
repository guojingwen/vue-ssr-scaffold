const axios = require('axios')
const util = require('../util/index')
const cookieUtil = require('../util/cookies')
let api = axios
if (process.env.VUE_ENV === 'server') {
  // 服务端走http长连接
  const http = require('http')
  const https = require('https')
  const httpAgent = new http.Agent({
    keepAlive: true
  })
  const httpsAgent = new https.Agent({
    keepAlive: true
  })
  api = axios.create({
    httpAgent,
    httpsAgent
  })
}

/**
 *  ajax拦截需要根据业务自行调整
 */
// 请求拦截
api.interceptors.request.use(config => {
  // 在请求发出之前进行一些操作
  if (!config.data) {
    config.data = {}
  }

  if (process.env.VUE_ENV === 'client') {
    if (!cookieUtil.getCookie('__wpt') && config.appAuth) {
      // 需要登录认证的接口调用前就阻止掉
      util.loginPrompt()
      return
    } else {
      config.headers.common['wp-authtoken'] = cookieUtil.getCookie('__wpt') || ''
      config.headers.common['wp-appid'] = 'ssr_wp'
    }
  }
  if (process.env.VUE_ENV === 'server') {
    config.headers.common['wp-authtoken'] = global.cookies.__wpt || ''
    config.headers.common['wp-appid'] = 'ssr_wp'
  }
  return config
}, err => {
  return Promise.reject(err)
})

// 响应拦截
api.interceptors.response.use(res => {
  let states = res.config.$states
  if (states) {
    Object.keys(states).forEach(key => {
      states[key] = !states[key]
    })
  }
  // 服务端
  if (process.env.VUE_ENV === 'server') {
    if (res.data.flag === -2) {
      // 跳转到登录页面
      global.context.res.clearCookie('__wpt', {
        maxAge: 0
      })
      global.cookies = {
        __wpt: ''
      }
      util.serverCheckLogin(global.context)

      return Promise.reject(res.data)
    }
    if (res.config.needLruCache) {
      global.apiCache.set(res.config.url + res.config.data, res.data)
    }
    return res.data
  }
  // 客户端
  if (typeof json === 'string') {
    if (res.indexOf('</html>') !== -1) {
      return Promise.reject(res.data)
    }
    res.data = JSON.parse(res.data)
  }

  if (res.data.flag === -2) {
    // 跳转到登录页面
    if (cookieUtil.getCookie('__wpt')) {
      cookieUtil.delCookie('__wpt')
    }
    util.loginPrompt()
    return Promise.reject(res.data)
  }
  if (res.data.flag !== 0) {
    Modal.toast(res.data.message)
    return Promise.reject(res.data)
  }
  return res.data
}, err => {
  return Promise.reject(err)
})

api.defaults.headers.common['Accept'] = 'application/json'
api.defaults.headers.common['Content-Type'] = 'application/json'

module.exports = api
