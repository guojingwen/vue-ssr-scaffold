import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
export function createRouter () {
  const routes = [{
    path: '/',
    name: 'home',
    component: resolve => require.ensure([], () => resolve(require('../views/home')), 'home'),
  }, {
    path: '/components',
    name: 'components',
    component: resolve => require.ensure([], () => resolve(require('../views/components/index')), 'components')
  }, {
    path: '/button',
    name: 'button',
    component: resolve => require.ensure([], () => resolve(require('../views/components/button')), 'components')
  }, {
    path: '/checkbox',
    name: 'checkbox',
    component: resolve => require.ensure([], () => resolve(require('../views/components/checkbox')), 'components')
  }, {
    path: '/switch',
    name: 'switch',
    component: resolve => require.ensure([], () => resolve(require('../views/components/switch')), 'components')
  }, {
    path: '/field',
    name: 'field',
    component: resolve => require.ensure([], () => resolve(require('../views/components/field')), 'components')
  }, {
    path: '/tabbar',
    name: 'tabbar',
    component: resolve => require.ensure([], () => resolve(require('../views/components/tabbar')), 'components')
  }, {
    path: '/item',
    name: 'item',
    component: resolve => require.ensure([], () => resolve(require('../views/components/item')), 'components')
  }, {
    path: '/header',
    name: 'header',
    component: resolve => require.ensure([], () => resolve(require('../views/components/header')), 'components')
  }, {
    path: '/business',
    name: 'business',
    component: resolve => require.ensure([], () => resolve(require('../views/business/index')), 'business')
  }, {
    path: '/flow',
    name: 'flow',
    component: resolve => require.ensure([], () => resolve(require('../views/business/flow')), 'business'),
    meta: {store: 'flow'}
  }, {
    path: '/tabflow/:userId',
    name: 'tabflow',
    component: resolve => require.ensure([], () => resolve(require('../views/business/tabflow')), 'business'),
    meta: {store: 'tabflow'},
  }, {
    path: '/shareComp',
    name: 'shareComp',
    component: resolve => require.ensure([], () => resolve(require('../views/business/tabflow')), 'business'),
    meta: {store: 'shareComp', needAuth: true}, // 需要登录
  }, {
    path: '/404',
    name: 'not-found',
    component: resolve => require.ensure([], () => resolve(require('../views/not-found')), 'not-found')
  }]
  routes.push({
    path: '/login',
    name: 'login',
    component: resolve => require.ensure([], () => resolve(require('../views/login')), 'login')
  })
  const router = new Router({
    mode: 'history',
    routes
  })

  router.beforeEach((to, from, next) => {
    if (typeof window !== 'undefined') {
      // 路由没有匹配到的情况下，直接跳转
      if (!to.matched.length) {
        window.location.href = `http://localhost:8071${to.fullPath}`
        return
      }
    }
    next()
  })
  return router
}
