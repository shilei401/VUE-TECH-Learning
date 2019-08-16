const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')

// const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin')
const ServerMiniCssExtractPlugin = require('./ServerMiniCssExtractPlugin')
const VueServerPlugin = require('vue-server-renderer/server-plugin')

const baseConfig = require('./webpack.config.base')

const VueLoaderPlugin = require('vue-loader/lib/plugin')

const defaultPlugins = [
  // make sure to include the plugin for the magic
  new VueLoaderPlugin()
]

let config
config = merge(baseConfig, {
  target: 'node',
  entry: {
    app: path.join(__dirname, '../src/server-entry.js')
  },
  devtool: 'source-map',
  output: {
    libraryTarget: 'commonjs2',
    filename: 'server-entry.js',
    path: path.join(__dirname, '../server-build')
  },
  // 这个打包出来的是要跑在node端的，我们没必要把vue/vuex都打包到server-entry.js中去
  // 所以声明下不要打包vue vuex等
  externals: Object.keys(require('../package.json').dependencies),
  module: {
    rules: [
      {
        test: /\.styl(us)?$/,
        use: [
          {
            loader: ServerMiniCssExtractPlugin.loader
          },
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
        // use: ExtractTextWebpackPlugin.extract({
        //   fallback: 'vue-style-loader',
        //   use: [
        //     {
        //       loader: 'css-loader'
        //     },
        //     {
        //       loader: 'postcss-loader',
        //       options: {
        //         sourceMap: true
        //       }
        //     },
        //     'stylus-loader'
        //   ]
        // })
      }
    ]
  },
  plugins: defaultPlugins.concat([
    new ServerMiniCssExtractPlugin({
      filename: 'styles.[hash:8].css'
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      'process.env.VUE_ENV': '"server"'
    }),
    new VueServerPlugin()
  ])
})
module.exports = config
