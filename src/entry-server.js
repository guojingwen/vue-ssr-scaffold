import { createApp } from './app'
import { merge, safelyGetProperty, serverCheckLogin } from './util'

const isDev = process.env.NODE_ENV !== 'production'

export default context => {
  return new Promise((resolve, reject) => {
    const s = isDev && Date.now()
    const { app, router, store } = createApp()
    // 修复states缓存问题
    if (!global.stateInitStr) {
      global.stateInitStr = merge({}, store.state)
    } else {
      store.replaceState(merge({}, store.state, global.stateInitStr))
    }

    const { url } = context
    const fullPath = router.resolve(url).route.fullPath

    if (fullPath !== url) {
      reject({ url: fullPath })
    }

    router.push(url)

    router.onReady(() => {
      if (!global.cookies.__wpt && safelyGetProperty(router.currentRoute, 'meta.needAuth')) {
        serverCheckLogin(global.context)
        return resolve(app)
      }

      const matchedComponents = router.getMatchedComponents()
      // 没有匹配到路由
      if (!matchedComponents.length) {
        reject({ code: 404 })
      }

      Promise.all(matchedComponents.map(({ asyncData }) => asyncData && asyncData({
        app,
        store,
        route: router.currentRoute,
        context
      }))).then(() => {
        isDev && console.log(`data pre-fetch: ${Date.now() - s}ms`)
        context.state = store.state
        resolve(app)
      }).catch(reject)
    }, reject)
  })
}
