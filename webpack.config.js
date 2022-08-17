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

const { CleanWebpackPlugin } = require('clean-webpack-plugin');

// 导出配置对象
module.exports = {
    // 在开发调试阶段，建议大家都把 devtool 的值设置为 eval-source-map
    // devtool: 'eval-source-map',
    // 在实际发布的时候，建议大家把 devtool 的值设置为 nosources-source-map 或直接关闭 SourceMap
    devtool: 'nosources-source-map',

    // mode 用来指定构建模式，可选值有 development 和 production
    // 结论：开发的时候一定要用 development，因为追求的是打包的速度，而不是体积；
    // 反过来，发布上线的时候一定要用 production，因为上线追求的是体积小，而不是打包速度快！
    mode: 'development',

    // entry：指定打包要处理那个文件
    entry: path.join(__dirname, './src/index1.js'),
    // 指定生成的文件要存放到哪里
    output: {
        // npm run dev打包输出文件的存放路径
        path: path.join(__dirname, 'dist'),
        // npm run dev打包生成的文件名
        filename: 'js/bundle.js'
    },
    // 3. 插件的数组，将来 webpack 在运行时，会加载并调用这些插件
    plugins: [htmlPlugin, new CleanWebpackPlugin()],

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
            // 在配置 url-loader 的时候，多个参数之间，使用 & 符号进行分隔
            { test: /\.jpg|png|gif$/, use: 'url-loader?limit=1200&outputPath=images' },
            // 使用 babel-loader 处理高级的 js 语法
            // 在配置 babel-loader 的时候，程序员只需要把自己的代码进行转换即可；一定要排除 node_modules 目录中的js文件
            // 因为第三方包中的 js 兼容性，不需要程序员关心
            {test: /\.js$/, use: 'babel-loader', exclude: '/node_modules/'}
        ]
    },
    resolve: {
        alias: {
            // 告诉 webpack，程序员写的代码中， @ 符号表示 src 这一层目录
            '@': path.join(__dirname, './src/')
        }
    }
}