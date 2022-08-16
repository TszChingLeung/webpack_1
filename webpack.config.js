// 导入 node.js 中专门操作路径的模块
const path = require('path')

// 1. 导入 html-webpack-plugin 这个插件，得到插件的构造函数
const HtmlPlugin = require('html-webpack-plugin')
// 2. new 构造函数，创建插件的实例对象
const htmlPlugin = new HtmlPlugin({
    // 指定要复制哪个页面
    template: './src/index.html',
    // 指定复制出来的文件名和存放路径
    filename: './index.html'
});

// 导出配置对象
module.exports = {
    mode: 'development', // mode 用来指定构建模式，可选值有 development 和 production

    // entry：指定打包要处理那个文件
    entry: path.join(__dirname, './src/index1.js'),
    // 指定生成的文件要存放到哪里
    output: {
        // npm run dev打包输出文件的存放路径
        path: path.join(__dirname, 'dist'),
        // npm run dev打包生成的文件名
        filename: 'bundle.js'
    },
    // 3. 插件的数组，将来 webpack 在运行时，会加载并调用这些插件
    plugins: [htmlPlugin],

    devServer: {
        open: true, // 初次打包完成后，自动打开浏览器
        host: '127.0.0.1', // 指定运行的主机地址
        port: 80 // 实时打包所使用的端口号
    },

    module: {
        rules: [
            // 定义了不同模块对应的 loader
            // 这里的正则表达式 \. 代表点，$ 表示以css结尾
            { test: /\.css$/, use: ['style-loader', 'css-loader'] },
            // 处理 .less 文件的 loader
            { test: /\.less$/, use: ['style-loader', 'css-loader', 'less-loader'] },
            // 处理图片文件的 loader(上面use后面要加载多个loader插件所以用数组，这里一个就用字符串即可)
            { test: /\.jpg|png|gif$/, use: 'url-loader' }
        ]
    }
}