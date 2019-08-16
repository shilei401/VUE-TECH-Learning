const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.config.base')

const HTMLPlugin = require('html-webpack-plugin')
// const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const VueClientPlugin = require('vue-server-renderer/client-plugin')

const isDev = process.env.NODE_ENV === 'development'

const defaultPlugins = [
  // make sure to include the plugin for the magic
  new VueLoaderPlugin(),

  // 我们使用vue、react这些框架的时候，一定要到webpack.DefinePlugin
  new webpack.DefinePlugin({// webpack在编译的过程当中以及我们在自己的写的js代码的时候 可以引用到这个变量 来判断这个环境
    'process.env': {// 现在vue、react都会根据不同的环境区分打包
      NODE_ENV: isDev ? '"development"' : '"production"'
    }
  }),
  new HTMLPlugin({
    template: path.join(__dirname, 'template.html')
  }),
  new VueClientPlugin()
]

const devServer = {
  port: 8000,
  host: '0.0.0.0',
  overlay: {
    error: true
  },
  proxy: {
    '/api': 'http://127.0.0.1:3333',
    '/user': 'http://127.0.0.1:3333'
  },
  hot: true,
  historyApiFallback: {
    index: '/public/index.html'
  }
}
let config
if (isDev) {
  config = merge(baseConfig, {
    mode: 'development',
    devtool: '#cheap-module-eval-source-map',
    module: {
      rules: [
        {
          test: /\.styl(us)?$/,
          use: [
            'style-loader',
            {
              loader: 'css-loader'
            },
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: true
              }
            },
            'stylus-loader'
          ]
        }
      ]
    },
    devServer,
    plugins: defaultPlugins.concat([
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NamedModulesPlugin()
    ])
  })
} else {
  config = merge(baseConfig, {
    mode: 'production',
    output: {
      filename: '[name].[chunkhash:8].js'
    },
    module: {
      rules: [
        {
          test: /\.styl(us)?$/,
          use: ExtractTextWebpackPlugin.extract({
            fallback: 'vue-style-loader',
            use: [
              {
                loader: 'css-loader'
              },
              {
                loader: 'postcss-loader',
                options: {
                  sourceMap: true
                }
              },
              'stylus-loader'
            ]
          })
        }
      ]
    },
    optimization: {
      splitChunks: {
        cacheGroups: {
          vue: {
            test: /vue/,
            chunks: 'initial',
            name: 'vue'
          }
        }
      },
      runtimeChunk: {
        name: 'manifest'
      }
    },
    plugins: defaultPlugins.concat([
      new ExtractTextWebpackPlugin({
        filename: 'styles.[hash:8].css'
      })
    ])
  })
}
module.exports = config
