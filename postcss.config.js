module.exports = {
    plugins: [
        require('autoprefixer')({
            browsers: ['last 3 versions', 'ios >= 7.0', 'Android >= 4.0', '> 5%']
        }),
    ]
}
