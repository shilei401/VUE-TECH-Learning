const Router = require('koa-router')

const apiRouter = new Router({ // /api开头的api它才去处理
  prefix: '/api'
})

// 返回前端的数据如果是正确的，给它一个固定的格式，让前端可以更好的去判断
const successResponse = (data) => {
  return {
    success: true,
    data
  }
}

apiRouter.get('/todo', async (ctx) => {
  const todos = await ctx.db.getAllTodos()
  ctx.body = successResponse(todos)
})

module.exports = apiRouter
