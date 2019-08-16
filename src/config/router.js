// 主要是router里边的一些设置
import Router from 'vue-router'
import routes from './routes'

// 需要这么做，因为我们的项目需要用到服务端渲染,
// 在服务端渲染的时候，如果这个文件只export default router,这会导致
// 在服务端渲染的时候出现内存溢出的问题。
export default () => {
  return new Router({
    routes,
    mode: 'history'
    // base: '/base/',
    // linkActiveClass: 'active-link',
    // linkExactActiveClass: 'exact-active-link'
    // scrollBehavior (to, from, savedPosition) { // 记录上次滚动条滚动到的位置
    //   if (savedPosition) {
    //     return savedPosition
    //   } else {
    //     return { x: 0, y: 0 }
    //   }
    // },
    // URL后面参数 把字符串转为 json object
    // parseQuery (string) {
    // },
    //
    // stringifyQuery (object) {
    // },
    // fallback: true // 因为并不是所有的浏览器都支持history路由的形式,在不支持的浏览器下，会自动帮我们切换为hash,
    // 如果你不需要它帮我们这么做，就设置其为false,如果不这么做，单页应用就变为多页应用了。
  })
}
