import { strDecode } from './entity-decode-handler'
import { baseconfig, htmlHeadAttrConfig } from '../../config';

function getHtmlHeadConfig (vm) {
    const { htmlHeadConfig }  = vm.$options
    if (htmlHeadConfig) {
        return typeof htmlHeadConfig === 'function'
            ? htmlHeadConfig.call(vm)
            : htmlHeadConfig
    }
}

function htmlHeadConfigReplace (config) {
    if (config) {
        config = Object.assign({}, htmlHeadAttrConfig, config)
        // 做反转义处理
        config.title = strDecode(config.title)
        config.description = strDecode(config.description)
        config.keywords = strDecode(config.keywords)
        document.title =config.title
        document.querySelector(`meta[name=keywords]`).content = config.keywords
        document.querySelector(`meta[name=description]`).content = config.description
        document.querySelector(`link[rel=canonical]`).href = config.canonical || `${location.protocol}//${location.hostname}${location.pathname}`
    }
}

const serverHtmlHeadConfigMixin = {
    created () {
        let config = getHtmlHeadConfig(this)
        if (config) {
            config = Object.assign({}, htmlHeadAttrConfig, config)
            // 做反转义处理
            config.title = strDecode(config.title)
            config.description = strDecode(config.description)
            config.keywords = strDecode(config.keywords)
            config.canonical = config.canonical || `${global.context.req.protocol}//${global.context.req.hostname}${global.context.req.url}`
            this.$ssrContext.htmlHeadConfig = config
        }
    }
}

const clientHtmlHeadConfigMixin = {
    mounted () {
        let config = getHtmlHeadConfig(this)
        htmlHeadConfigReplace(config)
    }
}

// 可以在路由的beforeResolve钩子中做
export const clientHtmlHeadConfigSetup = config => {
    htmlHeadConfigReplace(config)
}

export default process.env.VUE_ENV === 'server'
    ? serverHtmlHeadConfigMixin
    : clientHtmlHeadConfigMixin
