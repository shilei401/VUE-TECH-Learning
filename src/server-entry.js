// 在src下面新建一个文件 create-app.js
import createApp from './create-app'

export default context => {
  return new Promise((resolve, reject) => {
    const { app, router } = createApp()
    router.push(context.url)
    // 路由里边 所有的异步操作都完成后才会进入这个回调
    router.onReady(() => {
      // 每个url要显示的组件是不一样的, 要根据url匹配到这些组件
      const matchedComponents = router.getMatchedComponents()
      if (!matchedComponents.length) {
        return reject(new Error('no component matched'))
      }
      resolve(app)
    })
  })
}
