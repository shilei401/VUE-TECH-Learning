<template>
  <section class="real-app">
    <input
      type="text"
      class="add-input"
      autofocus="autofocus"
      placeholder="接下去要做什么?"
      @keyup.enter="addTodo"
    >
    <Item
      v-for="todo in filteredTodos"
      :key="todo.id"
      :todo="todo"
      @del="deleteTodo"
    />
    <Tabs
      :filter="filter"
      :todos="todos"
      @toggle="toggleFilter"
      @clearAllCompleted="clearAllCompleted"
    />
    <!-- <router-view /> -->
  </section>
</template>
<script>
import Item from './item.vue'
import Tabs from './tabs.vue'
let id = 0
export default {
  beforeRouteEnter (to, from, next) {
    // 一般来讲，这里会做数据的获取，把塞到对象当中，这样我们页面进入进来数据已经获取好了
    console.log('todo before enter')
    next(vm => {
      console.log('after enter vm.id is ', vm.id)
    })
  },
  beforeRouteUpdate (to, from, next) {
    // 这个同一个组件在不同的路由下面，/app/:id这种情况下，
    // id如果不同，并且用的都是Todo组件，那么Todo组件是会被复用的，它不会被销毁然后重新新建一个todo的组件
    // 场景:Todo的数据如果要根据后面的参数去获取，可以在这里去做。
    // 如果不这么做，可以通过增加一个 watch id的开销，也会增加程序的复杂度。
    console.log('todo update enter')
    next()
  },
  beforeRouteLeave (to, from, next) {
    // 可以在这里做一些提醒，如果一个很大的表单，用户一不小心点了一个别的路由链接，
    // 导致这个表单修改的数据一下子就没了，这个时候可以在这里判断下，
    // 如果用户做了一些修改，就弹出一个confirm框，问要不要离开，可以给应用提供一定的安全性
    console.log('todo leave enter')
    if (global.confirm('are you sure?')) {
      next()
    }
  },
  components: {
    Item,
    Tabs
  },
  props: ['id'],
  data () {
    return {
      todos: [],
      filter: 'all'
    }
  },
  computed: {
    filteredTodos () {
      if (this.filter === 'all') {
        return this.todos
      }
      const completed = this.filter === 'completed'
      return this.todos.filter(todo => completed === todo.completed)
    }
  },
  mounted () {
    console.log('todo mounted')
  },
  methods: {
    addTodo (e) {
      this.todos.unshift({
        id: id++,
        content: e.target.value.trim(),
        completed: false
      })
      e.target.value = ''
    },
    deleteTodo (id) {
      this.todos.splice(this.todos.findIndex(todo => todo.id === id), 1)
    },
    toggleFilter (state) {
      this.filter = state
    },
    clearAllCompleted () {
      this.todos = this.todos.filter(todo => !todo.completed)
    }
  }
}
</script>

<style lang="stylus" scoped>
.real-app{
    width 600px
    margin 0 auto
    bos-shadow 0 0 5px #666
}
.add-input{
    position relative
    margin 0
    width 100%
    font-size 24px
    font-family inherit
    font-weight inherit
    line-height 1.4em
    border 0
    outline none
    color inherit
    padding 6px
    border 1px solid #999
    box-shadow inset 0 -1px 5px 0 rgba(0, 0, 0, 0.2)
    box-sizing border-box
    font-smoothing antialiased
    padding 16px 16px 16px 60px
    boder none
    box-shadow inset 0 -2px 1px rgba(0, 0, 0, 0.03)
}
</style>
