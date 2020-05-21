module.exports = {
    extractCSS: process.env.NODE_ENV === 'production',
    preserveWhitespace: false,
    transformToRequire: {
        'wp-img-tag': 'src'
    }
}
