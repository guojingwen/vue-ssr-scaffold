module.exports = {
    root: true,   //  eslint找到这个标识后，不会再去父文件夹中找eslint的配置文件
    parser: 'babel-eslint',   //使用babel-eslint来作为eslint的解析器
    parserOptions: {      // 设置解析器选项
        sourceType: 'module'    // 表明自己的代码是ECMAScript模块
    },
    // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
    extends: 'standard',  // 继承eslint-config-standard里面提供的lint规则
    // required to lint *.vue files
    plugins: [ // 使用的插件eslint-plugin-html. 写配置文件的时候，可以省略eslint-plugin-
        'html'
    ],
    // 启用额外的规则或者覆盖基础配置中的规则的默认选项
    rules: {
        // allow paren-less arrow functions
        'arrow-parens': 0,
        // allow async-await
        'generator-star-spacing': 0,
        // http://eslint.org/docs/rules/comma-dangle
        'comma-dangle': ['error', 'only-multiline'],
        'semi': 0,
        'no-mixed-operators': 0,
        'one-var': 0,
        'no-useless-escape': 0,
        'camelcase': 0,
        'prefer-promise-reject-errors': 0,
        'no-var': 1,
        'indent': ['error', 2],
        'max-len': ['error', 200],
        'no-debugger': 0,
        'no-unreachable': 0,
        'no-tab': 0,
        'no-tabs': 0,
        'no-trailing-spaces': 0,
        'no-mixed-spaces-and-tabs': 0,
    },
    globals: {    // 声明在代码中自定义的全局变量
        _config: true,
        Modal: true,
        Bus: true,
    },
    env: {  // 定义预定义的全局变量,比如browser: true，这样你在代码中可以放心使用宿主环境给你提供的全局变量。
        browser: true
    }
}
