// 引入babel的es6特性兼容，兼容对象为安卓4.4   IE9及以下
import './scss/index.scss'
import Vue from 'vue'
import App from './App.vue'
import { createStore } from './store'
import { createRouter } from './router'
import htmlHeadConfigMixin from './util/html-head-config'
import * as utils from './util'
import installGlobalComponents from 'components'
import Modal from './util/modal'
// import Raven from 'raven-js';
// import RavenVue from 'raven-js/plugins/vue';
// const isProd = process.env.NODE_ENV === 'production'

if (process.env.VUE_ENV === 'client') {
  // 注册 弹窗组件到 window
  utils.windowBind('Modal', Modal)

  // 注册 fastclick 现在浏览器已经用不到 fastclick 了
  // const FastClick = require('fastclick')
  // FastClick.attach(document.body)
}

// 注册全局组件
installGlobalComponents(Vue)

// seo mixin
Vue.mixin(htmlHeadConfigMixin)

// 前端异常监控平台
/*
if (isProd) {
  let RavenConfigUrl = 'https://xxxxxxx@sentry.xxx.com/xx' // sentryid @ sentry网址 / 项目id
  Raven
    .config(RavenConfigUrl)
    .addPlugin(RavenVue, Vue)
    .install();
}
*/

export function createApp () {
  const store = createStore()
  const router = createRouter(store)

  const app = new Vue({
    router,
    store,
    render: h => h(App)
  })
  // 非父子组件通信
  if (process.env.VUE_ENV === 'client') {
    window.Bus = app
  } else {
    global.Bus = app
  }

  return { app, router, store }
}
