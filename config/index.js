module.exports = {
    apiServer: 'https://api.warmplace.cn:10443/api', // 'http://api.warmplace.cn',
    serverApiServer: 'http://192.168.0.40:10012/api', // 外网不通不知道为什么
    authorizeAddress: 'https://ssr.warmplace.cn:10443/login',
    domain: 'ssr.warmplace.cn:10443',
    htmlHeadAttrConfig: require('./html-head-config')
}
