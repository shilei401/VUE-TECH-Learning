<template lang="html">
  <div id="app">
    <div id="cover" />
    <Header />
    <!-- <p>{{ textC }}</p>
    <p>{{ textA }} & {{ textPlus }}</p>
    <p>{{ fullName }}</p>
    <p>{{ count }}</p> -->
    <!-- <Todo /> -->
    <!-- <router-link to="/app/123">
      app123
    </router-link>
    <router-link to="/app/456">
      app456
    </router-link> -->
    <router-link to="/app">
      app
    </router-link>
    <router-link to="/login">
      login
    </router-link>
    <!-- <router-link to="/login/exact">login exact</router-link> -->
    <transition name="fade">
      <router-view />
    </transition>
    <Footer />
    <!-- <router-view name="a" /> -->
  </div>
</template>

<script>
// import {
//   mapState,
//   mapGetters,
//   mapActions,
//   mapMutations
// } from 'vuex'
import Header from './layout/header.vue'
import Footer from './layout/footer.jsx'
// import Todo from './views/todo/todo.vue'

export default {
  metaInfo: {
    title: 'Jokcy\'s Todo App'
  },
  components: {
    Header,
    Footer
    // Todo
  },
  computed: {
    // count () {
    //   return this.$store.state.count
    // },
    // fullName () {
    //   return this.$store.getters.fullName
    // }
    // ...mapState(['count']),
    // 如果名字不一样
    // ...mapState({counter: 'count'}),或者
    // ...mapState({counter: (count) => state.count}),
    // ...mapState({
    //   count: (state) => state.count,
    //   textA: (state) => state.a.text,
    //   textC: state => state.c.text
    // }),
    // // ...mapGetters(['fullName'])
    // ...mapGetters({
    //   'fullName': 'fullName',
    //   'textPlus': 'a/textPlus'
    // })
  },
  mounted () {
    console.log(this.$store)
    // this.$store.state.count = 3 // 不推荐

    // let i = 1
    // setInterval(() => { // 这就是我们在组件内部，去调用$store的commit方法，去修改我们的 count的一个操作
    //   this.$store.commit('updateCount', i++) // 这样显示count就每隔1秒往上递增了
    // }, 1000)

    // this.$store.dispatch('updateCountASync', {
    //   num: 5,
    //   time: 2000
    // })

    this.updateCountASync({
      num: 5,
      time: 2000
    })
    // this.updateText('123')
    // this['a/updateText']('123')

    // this['a/add']()

    // this['b/testAction']()
  },
  methods: {
    // ...mapActions(['updateCountASync', 'a/add', 'b/testAction']),
    // // ...mapMutations([ 'updateText'])
    // ...mapMutations(['a/updateText'])
  }
}
</script>

<style lang="stylus" scoped>
#app{
    position absolute
    left 0
    right 0
    top 0
    bottom 0
}
#cover{
  position absolute
  left 0
  right 0
  top 0
  bottom 0
  background-color #999
  opacity .9
  z-index -1
}
</style>
