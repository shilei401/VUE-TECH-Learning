import Vue from 'vue'

// 继承使用方式1:
const component = {
  props: {
    active: Boolean,
    propOne: {
      required: true
    }
  },
  template: `
     <div>
       <input type="text" v-model="text">
       <span @click="handleChange">{{ propOne }}</span>
       <span v-show="active">see me if active</span>
     </div>
  `,
  data () {
    return {
      text: 123
    }
  },
  methods: {
    handleChange () {
      this.$emit('change')
    }
  },
  mounted () {
    console.log('comp mounted')
  }
}

// CompVue是Vue的子类, 以及预先已经设置好了以上属性
const CompVue = Vue.extend(component)
new CompVue({
  el: '#root',
  // 这样去写, 在组件内部是拿不到 propOne的
  // props: {
  //   propOne: '1111'
  // }
  // 这样就可以拿到啦
  propsData: {
    propOne: '1111'
  },
  // 可以设置data, 把之前的覆盖掉
  data: {
    text: 456
  },
  // 此时发现都被调用, 并且component内部的先被调用,
  // 并不给被覆盖
  mounted () {
    console.log('instance mounted')
  }
})

// 继承使用方式 2
const component = {
  props: {
    active: Boolean,
    propOne: {
      required: true
    }
  },
  template: `
     <div>
       <input type="text" v-model="text">
       <span @click="handleChange">{{ propOne }}</span>
       <span v-show="active">see me if active</span>
     </div>
  `,
  data () {
    return {
      text: 123
    }
  },
  methods: {
    handleChange () {
      this.$emit('change')
    }
  },
  mounted () {
    console.log('comp mounted')
  }
}

const component2 = {
  extends: component,
  // 不会覆盖component中的mounted方法,并且component中mounted方法先执行
  mounted () {
    console.log('comp2 mounted')
    // 表示component2的parent就是下面new Vue()这个实例
    console.log(this.$parent.$options.name)
    // 强烈不推荐修改父组件的属性
    this.$parent.text = '8888'
  },
  // 会覆盖掉componentdata中的属性
  data () {
    return {
      text: 456
    }
  }
}

new Vue({
  el: '#root',
  name: 'Root',
  components: {
    Comp: component2
  },
  data: {
    text: 23232
  },
  template: `
  <div>
    <span>{{text}}</span>
    <comp :propOne="111"></comp>
  </div>
  `
})

// 使用extends的场景
// 开发了一个功能已经很完善的公用组件,
// 也可能需要扩展一下它的一些属性,此时就可以extends下，把想要覆盖的和新扩展的添加上，
// 就可以达到对这个组件的扩展功能，而不需要写一个新的组件

// 补充: 可以给组件指定一个parent
