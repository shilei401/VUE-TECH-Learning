const path = require('path')
const webpack = require('webpack')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HTMLPlugin = require('html-webpack-plugin')
const ExtractPlugin = require('extract-text-webpack-plugin')
      
const isDev = process.env.NODE_ENV === 'development'

const config = {
  target:'web',
  entry: {
    app: path.join(__dirname, 'src/index.js')
  },
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'dist')
  },
  module:{
    rules:[
        {
          test : /\.jsx$/,
          loader: 'babel-loader',
        },
        {
          test : /.vue$/,
          loader:'vue-loader'
        },
        {
          test:/\.css/,
          use:[
            'style-loader',
            'css-loader',
            {
              loader:'postcss-loader',
              options:{
                sourceMap: true
              }
            }
          ]
        },
        {
          test : /\.(gif|jpg|jpeg|png|svg)$/,
          use:[
           {
             loader:'url-loader',
             options:{
                limit:1024,
                name:'[name].[ext]'
             }
           }
          ]
        }
    ]
  },
  plugins: [
    // make sure to include the plugin for the magic
    new VueLoaderPlugin(),

    //我们使用vue、react这些框架的时候，一定要到webpack.DefinePlugin
    new webpack.DefinePlugin({//webpack在编译的过程当中以及我们在自己的写的js代码的时候 可以引用到这个变量 来判断这个环境
      'process.env':{//现在vue、react都会根据不同的环境区分打包
          NODE_ENV: isDev ? '"developmeng"' : '"production"'
      }
    }),
    new HTMLPlugin()
  ]
}
if(isDev){
  config.module.rules.push({
    test:/\.styl/,
    use:[
      'style-loader',
      'css-loader',
      {
        loader:'postcss-loader',
        options:{
          sourceMap: true
        }
      },
      'stylus-loader'
    ]
   })

   config.devtool = '#cheap-module-eval-source-map'
   config.devServer = {
      port:8000,
      host:'0.0.0.0',
      overlay:{
          error:true
      },
      hot:true
      //historyApiFallback:{//因为我们做的是单页应用，会做很多的前端路由
      //}
      //open:true//在webpack-dev-server启动的时候自动帮我们打开浏览器
    }
    config.plugins.push(//热启动还要配置下面几个插件
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NamedModulesPlugin(),
      new webpack.NoEmitOnErrorsPlugin()
    )
}else{
  config.output.filename = '[name].[chunkhash:8].js'
  config.module.rules.push({
    test:/\.styl/,
    use: ExtractPlugin.extract({
      fallback: 'style-loader',
      use: [
          'css-loader',
          {
            loader:'postcss-loader',
            options:{
              sourceMap:true
            }
          },
          'stylus-loader'
        ]
    })
  })
  config.plugins.push(
    new ExtractPlugin('styles.[contentHash:8].css')
  )
}
module.exports = config;