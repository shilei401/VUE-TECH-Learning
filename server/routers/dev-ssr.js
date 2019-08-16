const Router = require('koa-router')
const axios = require('axios')
const path = require('path')
const fs = require('fs')

const MemoryFS = require('memory-fs')
const webpack = require('webpack')
const VueServerRenderer = require('vue-server-renderer')

const serverRender = require('./server-render')
const serverConfig = require('../../build/webpack.config.server')

// 步骤1: 获取服务端打包生成的bundle
// 1.1 在node环境中编译webpack
const serverCompiler = webpack(serverConfig)

// 1.2 指定打包输出的文件系统为mfs
// MemoryFS与我们node环境中fs的api是一模一样的,
// 而且它还扩展了一些api,它与fs的唯一区别: 它不把文件写入到磁盘上面,而且写入到内存里边
const mfs = new MemoryFS()
serverCompiler.outputFileSystem = mfs

// 1.3 生成bundle,记录webpack每次打包输出的文件
let bundle
// watch的好处: 在src下面每次改了某一个文件，它都会重新执行一个打包，就可以拿到新的文件
serverCompiler.watch({}, (err, stats) => {
  if (err) throw err
  // ESLINT的错误 会在stats中出现
  stats = stats.toJson()
  stats.errors.forEach(err => console.log(err))
  stats.warnings.forEach(warn => console.log(warn))

  const bundlePath = path.join(
    serverConfig.output.path,
    'vue-ssr-server-bundle.json'
  )
  // new bundle:D:\VUE\VUE-TECH-Learning\server-build\vue-ssr-server-bundle.json
  console.log('new bundle:' + bundlePath)
  bundle = JSON.parse(mfs.readFileSync(bundlePath, 'utf-8'))
  console.log('new bundle generated')
})

// 步骤2: 编写服务端渲染的函数
// 写一个koa中间件，用来帮助处理服务端渲染要返回的内容
const handleSSR = async (ctx) => {
  if (!bundle) { // 存在
    ctx.body = '您等一会，别着急......'
    return
  }

  // 获取客户端打包的js文件
  // 获取客户端webpack dev server帮我们打包出来的 javascript的一个地址
  // 因为我们要拿到这个地址后，才能在拼接html的时候把这个路径写在里面
  // 通过向webpack dev server发送一个请求来拿到
  // 也要通过vue-server-render插件在webpack client生成这个东西
  // 需要在webpack.config.client.js中 添加插件
  // const VueClientPlugin = require('vue-sever-renderer/client-plugin')
  const clientManifestResp = await axios.get(
    'http://127.0.0.1:8000/public/vue-ssr-client-manifest.json'
  )

  // clientManifest是一个json文件，该文件中包含客户端打包后的结果文件
  // 以及各模块的描述信息
  const clientManifest = clientManifestResp.data

  console.log('bundle' + bundle)
  // 声明一个renderer
  const renderer = VueServerRenderer.createBundleRenderer(bundle, {
    inject: false, // 不要求它去注入模版
    clientManifest
  })
  // 使用ejs创建一个html模板
  // 通过vue server render它输出的内容只是我们body里边的这部分html代码
  // 一个完整的html肯定要包含头、script、link style等等，
  // 所以我们要写一个模块来帮助我们生成一个完整的html代码
  // 在server/server.template.ejs 用这个ejs模板引擎来帮助我们渲染html
  // cnpm i ejs -S
  const template = fs.readFileSync(
    path.join(__dirname, '../server.template.ejs'),
    'utf-8'
  )
  await serverRender(ctx, renderer, template)
}

const router = new Router()
router.get('*', handleSSR)

module.exports = router
