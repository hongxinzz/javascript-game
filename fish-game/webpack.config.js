//引入路径
var path = require('path');
var webpack = require('webpack')
//引入html模板
var HtmlWebpackPlugin = require('html-webpack-plugin');
//复制image
var CopyWebpackPlugin = require('copy-webpack-plugin');
//文件压缩
// var UglifyJSPlugin = webpack.optimize.UglifyJsPlugin;新版本移除
//清楚文件操作
var CleanWebpackPlugin = require('clean-webpack-plugin');
//分离css
var ExtractTextPlugin = require("extract-text-webpack-plugin");




//暴露
module.exports = {
    entry:'./src/js/index.js',//入口
    output:{//出口
        filename:'bundle.js',//打包的文件名字
        path:path.resolve(__dirname,'dist')//打包以后的文件名字
    },
    module:{//模块
        rules:[{
            test: /\.css$/,
            use: ExtractTextPlugin.extract({
              fallback: "style-loader",
              use: "css-loader"
            })
        }]
    },
    plugins:[//插件
        //清除操作
        new CleanWebpackPlugin(['dist']),

        //加入模板任务
        new HtmlWebpackPlugin({
            //文件
            template:'src/index.html',
            //打包以后名称
            filename:'index.html'
        }),

         //分离css
         new ExtractTextPlugin("css/style.css"),

        //复制图片任务
        new CopyWebpackPlugin([
            {
              from: 'src/images',
              to: 'images',
            }
          ]),

        //文件压缩
        new webpack.LoaderOptionsPlugin({
            minimize: true
        }),
    ]
}