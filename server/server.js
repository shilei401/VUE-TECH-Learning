const Koa = require('koa')
const pageRouter = require('./routers/dev-ssr')
const apiRouter = require('./routers/api')
const createDb = require('./db/db')
const config = require('../app.config')
const koaBody = require('koa-body')

const db = createDb(config.db.appId, config.db.appKey)

const app = new Koa()

// 因为服务端渲染是分 开发环境 和 正式环境 2种不同的情况
const isDev = process.env.NODE_ENV === 'development'

// 先编写一个简单的koa中间件
// 来记录下所有服务端的请求 以及 抓取一些错误
// next就是执行下一个中间件的使用
// 因为koa使用的是async和await的写法
app.use(async (ctx, next) => {
  try {
    console.log(`request with path ${ctx.path}`)
    await next()
  } catch (err) {
    console.log(err)
    ctx.status = 500
    if (isDev) {
      ctx.body = err.message
    } else {
      ctx.body = 'please try again later'
    }
  }
})

app.use(async (ctx, next) => {
  ctx.db = db
  await next()
})

app.use(koaBody())
app.use(apiRouter.routes()).use(apiRouter.allowedMethods())
app.use(pageRouter.routes()).use(pageRouter.allowedMethods())

const HOST = process.env.HOST || '0.0.0.0'
const PORT = process.env.PORT || 3333

app.listen(PORT, HOST, () => {
  console.log(`server is listening on ${HOST}:${PORT}`)
})
