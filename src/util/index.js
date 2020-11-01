const {fetchCommonApi, listConcat} = require('../api')

/**
 * json数据 深拷贝方法
 * var a = {name: 'zs', age: 13, info: {i: 1, j: 2}, skills: [1, 1, 3]}
 * var b = {age2: 22, info: {i: 3, k: [1]}, skills: [0, 1, {i: 2}]}
 * merge(a, b)
 */
export const merge = function (target, ...sources) {
    for (let source of sources) {
        for (let i in source) {
            if (typeof source[i] === 'object') {
                if (typeof target[i] !== 'object') {
                    if (Array.isArray(source[i])) {
                        target[i] = []
                    } else {
                        target[i] = {}
                    }
                }
                merge(target[i], source[i])
            } else {
                target[i] = source[i]
            }
        }
    }
    return target
}

export const windowBind = (...args) => {
    let windowKey = null, obj = {}
    if (args.length === 1) {
        obj = args[0]
        for (let key in obj) {
            if (obj.hasOwnProperty(key)) {
                window[key] = obj[key]
            }
        }
    } else {
        windowKey = args[0]
        obj = args[1]
        window[windowKey] = obj
    }
}

export const isObject = function (obj) {
    return Object.prototype.toString.call(obj) === '[object Object]'
}

export function getParams (urlstr = location.href) {
    let index = urlstr.indexOf('?')
    if (index < 0) {
        return {}
    }
    let url = decodeURIComponent(urlstr)
    let strs = url.substr(index + 1).split('&')
    let p = {}
    for (let i = 0; i < strs.length; i++) {
        p[strs[i].split('=')[0]] = unescape(strs[i].split('=')[1])
    }
    return p
}

// 1、区分前进后退 2、记录前一页滚动高度 3、缓存上一页的store
export const backHandler = {
    isBack: false,
    exec () {
        let urlStr = `${location.pathname + location.search}`
        let ts = getParams().ts
        if (location.search && ts) {
            // 后退
            this.currentPageId = ts
            this.isBack = true
        } else {
            // 前进
            this.isBack = false
            ts = Date.now()
            this.currentPageId = ts
            this.cachePageTops[ts] = this.getScrollTop()
            urlStr = `${urlStr + (location.search ? '&' : '?')}ts=${ts}`
            history.replaceState({
                home: 'home'
            }, 'home', urlStr)
        }
        // console.log(this.isBack ? '后退' : '前进')
    },

    removeTs () { // 后退移除 url 的 ts
        if (!this.isBack) return
        setTimeout(() => {
            let urlStr = `${location.pathname + location.search}`
            let ts = getParams().ts
            urlStr = urlStr.replace(/([?|&]ts=)[\w]{1,}/, '')
            this.scrollTop(this.cachePageTops[ts])
            delete this.cachePageTops[ts]
            history.replaceState({
                home: 'home'
            }, 'home', urlStr)
        },0)
    },

    getScrollTop () {
        let pages = document.getElementById('app').querySelectorAll('.page'),
            view,
            page = pages[pages.length - 1]

        let scrollTop = page ? (Number((view = page.querySelector('.wp-scroll-wrapper')) && view.scrollTop)) : 0
        return scrollTop
    },
    scrollTop (st) {
        let pages = document.getElementById('app').querySelectorAll('.page'),
            view,
            page = pages[pages.length - 1]
        if (page && (view = page.querySelector('.wp-scroll-wrapper'))) {
            view.scrollTop = st
        }
    },
    // 缓存当前页面的指定高度
    cachePageTops: {},
    // 缓存 访问过页面的store问题 解决动态路由（/question/1 /question/2）返回缓存问题
    cachePageStoreStatus: {},
    // 记录曾经加载过的页面，用于解决没有配置meta.store的页面，刷新后退到该页面的情况， 要强制执行async获取数据
    cacheOncePageloaded: {},
}

export const  safelyGetProperty = (obj, properties) => properties.split('.').reduce((acc, property) => acc && acc[property], obj)

export const createList  = function (...arr) {
    const obj = {}
    arr.forEach(item => {
        merge(obj, {
            state: {
                [item.name]: {
                    _hasData: true, // 是否有更多数据
                    pageIndex: 0,
                    list: [],
                }
            },
            getters: {
                [item.name]: state => state[item.name],
            },
            actions: {
                [item.name]: ({state, commit}, [params, states]) =>
                    fetchCommonApi({path: item.path}, Object.assign({pageIndex: state[item.name]['pageIndex'] + 1, pageSize: item.pageSize || 10}, params), states).then(res => {
                        res._hasData = (res.pageIndex * res.pageSize < res.count)
                        if (!Array.isArray(res.list)) res.list = []
                        return res
                    }),
            },
            mutations: {
                [item.name]: (state, data) => listConcat(state[item.name], data),
            },
        })
    })
    return obj
}

// 用于tab切换 缓存tab的 selectIndex
export const createSelectIndex = function (name) {
    return {
        state: {
            [name]: 0
        },
        getters: {
            [name]: state => state[name],
        },
        mutations: {
            [name]: (state, data) => state[name] = data,
        }
    }
}

export const serverCheckLogin = function (context) {
    let target = encodeURIComponent(context.url)
    if (!global.cookies.__wpt) {
        context.res.redirect(302, `/login?target=${target}`)
    }
}

export const loginPrompt = function (url = location.href, noTip) {
    if (!noTip) {
        Modal.toast({
            content: '您还未登录，请先登录',
        })
    }
    $app.$router.push({path: '/login', query: {target: encodeURIComponent(url)}})
}
