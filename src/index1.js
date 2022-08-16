// 传统的导入方法都是使用 <script type="text/javascript" src=""> 标签导入依赖
// 1. 使用ES6导入语法，导入 jQuery 包
// 导入 jquery 并使用 $ 符号接收，跟传统的jquery使用方式的符号一样
import $ from 'jquery'

// 导入样式（在 webpack 中，一切皆模块，都可以通过 ES6 导入语法进行导入和使用）
// 如果某个模块中，使用 from 接收到的成员为 undefined ，则没必要进行接收
import css from './css/index.css'
import './css/index.less'

console.log("from接收的css:" + css)

// 1. 导入图片，得到图片文件
import logo from './images/logo.jpg'
//console.log("logo对象：" + logo)
// 2. 给 img 标签的 src 动态赋值（通过jquery选择index.html中的img标签）
$('.box').attr('src', logo)

// 2. 定义 jQuery 的入口函数
$(function () {
    // 3. 实现奇偶行变色s
    // 奇数行为红色
    $('li:odd').css('background-color', 'red')
    $('li:even').css('background-color', 'pink')
})