const ejs = require('ejs') // 使用ejs渲染template

module.exports = async (ctx, renderer, template) => {
  // ctx是需要的，因为要把返回的html内容写到ctx.body里面
  // renderer 因为开发环境和正式环境不一样，所以要外部传入
  // template 从外部传入
  ctx.headers['ContentType'] = 'text/html'
  // context是传入到vue-server-renderer,它拿到这个context,
  // 它渲染完成之后，会在上面插入一堆的属性， 方便我们拿来渲染我们的html
  // 里边会包括客户端的js路径、css路径等
  // 打印出来ctx.path 为 /
  const context = { url: ctx.path }
  try {
    const appString = await renderer.renderToString(context)
    console.log(context.renderStyles())
    const html = ejs.render(template, {
      appString,
      style: context.renderStyles(),
      scripts: context.renderScripts()
    })
    ctx.body = html
  } catch (err) {
    console.log('render error', err)
    throw err
  }
}
