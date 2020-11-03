module.exports = {
    apiServer: 'https://api.warmplace.cn/api', // 'http://api.warmplace.cn',
    serverApiServer: 'http://172.19.102.36:10012/api', // 外网不通不知道为什么
    authorizeAddress: 'https://ssr.warmplace.cn/login',
    domain: 'ssr.warmplace.cn',
    htmlHeadAttrConfig: require('./html-head-config')
}
