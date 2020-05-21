const path = require('path')
const webpack = require('webpack')
const vueConfig = require('./vue-loader.config')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const moment = require('moment')
const resolve = file => path.resolve(__dirname, file)
const isProd = process.env.NODE_ENV === 'production'
const config = require('../config')
const isUnLint = process.env.LINT_ENV === 'unlint'

const lintRule = isUnLint ? {} : {
    test: /\.(js|vue)$/,
    loader: 'eslint-loader',
    enforce: 'pre',
    include: path.resolve(__dirname, '../src'),
    options: {
        formatter: require('eslint-friendly-formatter')
    }
}

const urlLoaderOptions = {
    limit: 10 * 1024,
    name: '[name].[ext]?[hash]',
}

if (isProd) {
    urlLoaderOptions.outputPath = '/images/'
    urlLoaderOptions.publicPath = '/dist/images'
}

const webpackConfig = {
    devtool: isProd ?
        false :
        '#cheap-module-source-map',
    output: {
        path: path.resolve(__dirname, '../dist'),
        publicPath: '/dist/',
        filename: '[name].js?_=[chunkhash]',
        chunkFilename: '[name].[chunkhash].js' // 非主入口的文件名，即未被列在entry中，却又需要被打包出来的文件命名配置
    },
    resolve: {
        extensions: ['.js', '.vue', '.scss'],
        modules: [
            resolve('../src'),
            resolve('../node_modules')
        ],
        // 使用 cnpm 进行依赖安装，把 resolve 里的 symlinks 设为 true
        symlinks: true,
        alias: {
            '@': path.resolve(__dirname, '../src'),
        }
    },
    module: {
        noParse: /es6-promise\.js$/, // avoid webpack shimming process
        rules: [
            lintRule, {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: vueConfig
            }, {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            }, {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'url-loader',
                options: urlLoaderOptions
            }, {
                test: /\.css$/,
                use: isProd ?
                    ExtractTextPlugin.extract({
                        use: 'css-loader?minimize',
                        fallback: 'vue-style-loader'
                    }) :
                    ['vue-style-loader', 'css-loader', 'postcss-loader']
            }, {
                test: /\.scss$/,
                use: isProd ?
                    ExtractTextPlugin.extract({
                        use: ['css-loader?minimize', 'postcss-loader', 'sass-loader'],
                        fallback: 'vue-style-loader'
                    }) :
                    ['vue-style-loader', 'css-loader', 'postcss-loader', 'sass-loader']
            }
        ]
    },
    performance: {
        maxEntrypointSize: 300000,
        hints: isProd ? 'warning' : false
    },
    plugins: isProd ?
        [
            // 时间戳
            new webpack.BannerPlugin({
                banner: moment().format('YYYY-MM-DD HH:mm:ss')
            }),
            // 将一些有联系的模块，放到一个闭包函数里面去，通过减少闭包函数数量从而加快JS的执行速度。
            new webpack.optimize.ModuleConcatenationPlugin(),
            new webpack.optimize.UglifyJsPlugin({
                compress: {
                    warnings: false
                }
            }),
            new ExtractTextPlugin({
                filename: 'common.css?_=[chunkhash]'
            })
        ] :
        [
            new FriendlyErrorsPlugin()
        ]
}
module.exports = webpackConfig
