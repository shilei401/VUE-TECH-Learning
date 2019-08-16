import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import App from './app.vue'

import './assets/styles/global.styl'
import createRouter from './config/router'
import createStore from './store/store'

Vue.use(VueRouter)
Vue.use(Vuex)
const router = createRouter()
const store = createStore()

// 路由守卫跳转的时候，都会触发这个钩子
router.beforeEach((to, form, next) => {
  console.log('before  each invoked')
  next()
})

router.beforeResolve((to, form, next) => {
  console.log('before  resolve invoked')
  next()
})

// 每次导航跳转完成之后触发，因此接受的参数就不需要next
router.afterEach((to, form) => {
  console.log('after each  invoked')
})

// const root = document.createElement('div')
// document.body.appendChild(root)

// 动态注册C模块
store.registerModule('c', {
  state: {
    text: 3
  }
})

new Vue({
  store,
  router, // 这是vue-router的一个使用方法，在根节点的Vue实例对象上面去挂在这个router对象之后，
  // 然后通过其他方式，让我们写的每个组件中里面都可以去拿到这个router对象，这一步通过
  // Vue.use(VueRouter)来实现
  render: (h) => h(App) // 渲染出我们App组件的内容
}).$mount('#root') // 通过它把渲染的内容挂载到某个html节点上
