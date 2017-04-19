var path = require('path')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var CopyWebpackPlugin = require('copy-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var argv = require('yargs').argv;
var fs = require("fs")

function walk(dir) { //获取目录
    var children = []
    fs.readdirSync(dir).forEach(function(filename) {
        var path = dir + "/" + filename
        var stat = fs.statSync(path)
        if (stat && stat.isDirectory()) {
            children.push(filename)
        }
    })
    return children
}
const config = {
    host: 'localhost',
    port: 2222,
    htmlinputpath: 'src/views',
    appoutpath: 'dist',
    jsoutputpath: 'js',
    template: 'src/template.html',
    qiniuUrlDev: 'cdn.baicaiyun.com',
    qiniuUrlProduct: 'http://cdn.baicaiyun.com/pc/' //七牛打包路径
}
const global = {
    __DEV__: process.env.NODE_ENV === 'development', //是否开发环境
    __QINIUURL__: argv.Qiniu ? `'${config.qiniuUrlProduct}'` : `'${config.qiniuUrlDev}'` //切换链接
}
var htmldata = walk(config.htmlinputpath);
var HtmlWebpackPluginData = []
var entry = {}
for (var key in htmldata) {
    var tempfilename = htmldata[key] + '.html' //输出文件名同文件夹名
    var temptemplate = path.join(config.htmlinputpath, htmldata[key], 'template.html') //默认文件下下template.html
    var tempjs = path.resolve(config.htmlinputpath, htmldata[key] + '/index.js') //默认同文件夹名js
    var temp = new HtmlWebpackPlugin({
        filename: tempfilename,
        template: temptemplate,
        chunks: [htmldata[key]],
        minify: {
            removeComments: !global.__DEV__, //移除说明
            collapseWhitespace: !global.__DEV__ //代码缩进
        },
    })
    entry[htmldata[key]] = tempjs
    HtmlWebpackPluginData.push(temp)
}
var plugins = [
    new webpack.DefinePlugin(global),
    new ExtractTextPlugin('css/[name].css'),
    new CopyWebpackPlugin([{
        from: 'src/static',
        to: './static'
    }]),
    new CopyWebpackPlugin([{
        from: 'src/http',
        to: './http'
    }]),
    new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false //压缩js代码
        }
    })
]
plugins = plugins.concat(HtmlWebpackPluginData)
const BASE_CSS_LOADER = '?modules&localIdentName=[name]__[local]___[hash:base64:5]'
module.exports = {
    externals: {
        // require("jquery") 是引用自外部模块的
        // 对应全局变量 jQuery
        "jquery": "jQuery"
    },
    entry: entry,
    output: {
        publicPath: '',
        path: path.resolve(__dirname, config.appoutpath),
        //注意用一个数组[name]来代替固定名称，它会根据entry的入口文件名称生成多个js文件，这里就是(app.js,mobile.js和vendors.js)
        filename: config.jsoutputpath + '/[name].js'
    },
    module: {
        loaders: [ // Extract css files
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader" + BASE_CSS_LOADER
                })
            }, {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [{
                        loader: "css-loader" + BASE_CSS_LOADER
                    }, {
                        loader: "sass-loader"
                    }]
                }) //这里用了样式分离出来的插件，如果不想分离出来，可以直接这样写 loader:'style!css!sass'
            }, {
                test: /\.(js|jsx)?$/,
                loader: 'babel-loader', // 'babel-loader' is also a legal name to reference
                query: {
                    presets: ['react', 'es2015'],
                },
            }
        ]
    },
    plugins: plugins,
    devServer: {
        contentBase: config.appoutpath,
        host: config.host,
        port: config.port,
    },
}
