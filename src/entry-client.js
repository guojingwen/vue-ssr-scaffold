import Vue from 'vue'
import 'es6-promise/auto'
import { createApp } from './app'
import ProgressBar from 'components/progress-bar'
import { loginPrompt, backHandler, safelyGetProperty } from './util'
import {getCookie} from '@/util/cookies'

const {app, router, store} = createApp()

// 全局进度条
const bar = Vue.prototype.$bar = new Vue(ProgressBar).$mount()
document.body.appendChild(bar.$el)

if (process.env.NODE_ENV === 'development') {
  window.$app = app
}

const stateInitStr = JSON.stringify(store.state)

// 用服务端初始化状态填充store。
// state会在ssr期间被确定并内联进页面。
if (window.__INITIAL_STATE__) {
  store.replaceState(window.__INITIAL_STATE__)
}

const notLogin = () => {
  if (!getCookie('__wpt')) {
    loginPrompt()
  }
}

// 重复点击一个链接的路由跳转问题修复
let isRouting = false
const $push = router.push
router.push = function (location, onComplete, onAbort) {
  if (isRouting) {
    return
  }
  isRouting = true

  $push.call(router, location,
    function () {
      isRouting = false
      if (onComplete && typeof onComplete === 'function') {
        onComplete()
      }
    },
    function () {
      isRouting = false
      if (onAbort && typeof onAbort === 'function') {
        onAbort()
      }
    }
  )
}

// 等待路由解析完所有异步钩子守卫，获取数据
router.onReady(() => {
  safelyGetProperty(router.currentRoute, 'meta.needAuth') && notLogin()
  // 添加路由器钩子来处理asyncData。
  // 在初始路由被解析之后执行，防止重复获取已有的数据
  // 使用router.beforeResolve()，以便所有异步组件被解析。

  router.beforeResolve((to, from, next) => {
    if (safelyGetProperty(to, 'meta.needAuth') && !getCookie('__wpt')) {
      Modal.toast({
        content: '您还未登录，请先登录',
      })
      next({ path: '/login', query: {target: encodeURIComponent(to.fullPath)} })
      return
    }
    // 开始执行进度条
    bar.start()

    // 区分前进后退的方法
    backHandler.exec()

    const pageId = backHandler.currentPageId
    const cachePageStoreStatus = backHandler.cachePageStoreStatus
    const cacheOncePageloaded = backHandler.cacheOncePageloaded

    const meta = to.meta
    const fromMeta = from.meta

    const matched = router.getMatchedComponents(to)
    const prevMatched = router.getMatchedComponents(from)

    /**
     * diffed为true表示 只要是路由跳转asyncData都会执行
     * 后退时（刷新页面再后退除外）直接return掉，不执行下面的Promise.all
     * 官方默认动态路由和共用组件路由(/user/post， other/post/:id)diff为true不执行asyncData，而对我们来说这两种情况都要执行asyncData
     */
    let diffed = true
    const activated = matched.filter((c, i) => {
      return diffed || (diffed = (prevMatched[i] !== c))
    })
    const asyncDataHooks = activated.map(c => c.asyncData).filter(_ => _)

    // 动态路由相互跳转 重新渲染一下页面
    let toReload = false
    if (to.name === from.name && safelyGetProperty(to, 'meta.needReloadOnHash')) {
      toReload = true
    }

    if (backHandler.isBack) {
      let isPageCached = cacheOncePageloaded[pageId] // 是否是刷新过后退
      if (isPageCached) {
        delete cacheOncePageloaded[pageId]
      }

      if (meta && meta.store && cachePageStoreStatus[pageId]) {
        bar.finish()
        // 1. 后退 取出之前缓存的数据（如果有数据的情况）
        store.state[meta.store] = JSON.parse(cachePageStoreStatus[pageId])
        // 缓存的数据已经使用了 清空它
        delete cachePageStoreStatus[pageId]
        toReload && Bus.$emit('toReload')
        return next()
      } else if (!safelyGetProperty(to, 'meta.store')) { // 2. 没有配置store的情况
        bar.finish()
        toReload && Bus.$emit('toReload')
        // 没有配置store的情况，页面加载过，不执行asyncData
        if (isPageCached) {
          return next()
        }
        // 刷新过再后退到没有配置meta.store的页面 走下面的asyncData 重新获取数据
      } else if (to.name === from.name && !cachePageStoreStatus[pageId]) {
        // 3. 动态路由相互跳转 且 刷新过页面再后退  这种情况 meta 一定有 store
        store.state[meta.store] = JSON.parse(stateInitStr)[meta.store] // 初始化页面state
      }
      // 4. 剩下一种情况是 刷新过页面再后退 这个要执行下面的asyncData获取数据
    } else {
      if (fromMeta && fromMeta.store) {
        // 前进时缓存前一页的store
        cachePageStoreStatus[pageId] = JSON.stringify(store.state[fromMeta.store])
      }
      // noResetStore 进入页面不初始化store
      if (meta && meta.store && !meta.noResetStore) {
        // 再次前进到当前页面store初始化
        store.state[meta.store] = JSON.parse(stateInitStr)[meta.store]
      }
      // 记录加载过的页面
      cacheOncePageloaded[pageId] = true
    }

    Promise.all(asyncDataHooks.map(hook => hook({ app, store, route: to, context: JSON.parse(stateInitStr)[meta.store] })))
      .then(() => {
        bar.finish()
        toReload && Bus.$emit('toReload')
        next()
      })
      .catch(next)
  })

  router.afterEach((to, from) => { // 执行这个方法是asyncData方法已经完成
    backHandler.removeTs()
  })

  // 挂在到实际的dom
  app.$mount('#app')
})
