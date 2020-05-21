const api = require('./setup')
const Config = require('../../config')

/**
 *  公用ajax请求方法
 */
module.exports.fetchCommonApi = ({path = throwError('第一个参数的path')} = throwError('第一个参数'), params = {}, config, requestStatesChange = true) => {
  const rConfig = {}
  if (Reflect.toString.call(config) === '[object Object]') {
    rConfig.$states = config
    ;['appAuth', 'needLruCache', 'serverOut'].forEach(key => {
      rConfig[key] = config[key];
      (key in rConfig.$states) && delete rConfig.$states[key]
    })
    if (requestStatesChange) {
      Object.keys(rConfig.$states).forEach(key => {
        rConfig.$states[key] = !rConfig.$states[key]
      })
    }
  }

  const url = Config.apiServer + path

  if (process.env.VUE_ENV === 'server') {
    if (rConfig.needLruCache) {
      const hit = global.apiCache.get(url + JSON.stringify(params))
      if (hit) {
        return Promise.resolve(hit)
      }
    }
  }
  return api.post(url, params, rConfig).catch(e => {
    if (e && e.request && e.request.readyState === 4 && e.request.status === 0) {
      if (process.env.VUE_ENV === 'client') {
        Modal.toast('请检查网络连接是否正常')
      } else {
        console.log('请检查网络连接是否正常')
      }
    }
    throw e
  })
}
const throwError = (name) => {
  throw new Error(`${name}必填！`)
}

module.exports.listConcat = (target, source) => {
  if ([0, 1].includes(source.pageIndex)) {
    Object.assign(target, source)
    target.list.length = (source.list || []).length
  } else {
    Object.assign(target, source, {list: target.list.concat(source.list || [])})
  }
}
