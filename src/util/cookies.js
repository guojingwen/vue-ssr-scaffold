// todo 这一块代码有些low, 需要调整

export function getCookie (c_name) {
    if (document.cookie.length > 0) {
        let c_start = document.cookie.indexOf(c_name + '=')
        if (c_start !== -1) {
            c_start = c_start + c_name.length + 1
            let c_end = document.cookie.indexOf(';', c_start)
            if (c_end === -1) {
                c_end = document.cookie.length
            }
            return unescape(document.cookie.substring(c_start, c_end)).replace(/"/g, '')
        }
    }
    return ''
}

export function setCookie (name, value) {
    // 设置名称为name,值为value的Cookie
    // 初始化时间
    let expdate = new Date()
    // 时间
    expdate.setTime(expdate.getTime() + 30 * 60 * 1000)
    // eslint-disable-next-line max-len
    document.cookie = `${name}=${value};expires=${expdate.toGMTString()};path=/`

    // 即document.cookie= name+"="+value+";path=/";
    // 时间可以不要，但路径(path)必须要填写，因为JS的默认路径是当前页，如果不填，此cookie只在当前页面生效！~
}
export function delCookie (name) {
    let exp = new Date()
    exp.setTime(exp.getTime() - 1)
    let cval = getCookie(name)
    if (cval !== null) {
        document.cookie = name + '=' + cval + ';expires=' + exp.toGMTString()
    }
}
