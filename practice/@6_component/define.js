import Vue from 'vue'

// const component = {
//   template: '<div>this is component</div>'
// }

// Vue.component('CompOne', component)

// new Vue({
//   el: '#root',
//   template: '<comp-one></comp-one>'
// })

// const component = {
//   props: {
//     active: Boolean,
//     propOne: String,
//     onChange: Function
//   },
//   template: `
//      <div>
//        <input type="text" v-model="text">
//        <span @click="handleChange">{{ propOne }}</span>
//        <span v-show="active">see me if active</span>
//      </div>
//   `,
//   data () {
//     return {
//       text: 123
//     }
//   },
//   methods: {
//     handleChange () {
//       this.onChange()
//     }
//   }
// }

// new Vue({
//   components: {
//     CompOne: component
//   },
//   data: {
//     prop1: 'text1'
//   },
//   methods: {
//     handleChange () {
//       this.prop1+=1
//     }
//   },
//   el: '#root',
//   template: `
//   <div>
//     <comp-one :active="true" :prop-one="prop1" :on-change="handleChange"></comp-one>
//     <comp-one :active="false" ></comp-one>
//   </div>
//   `
// })

const component = {
  props: {
    active: {
      // type: Boolean,
      // required: true,
      // default: true
      // 在传default值的时候，如果它接收的是一个对象，那么需要给defalt声明一个方法，
      // 然后在里面去return一个对象。
      // default () {
      //   return {
      //   }
      // }
      // 如果想更严格的校验你的prop,可以声明一个validator的方法，来自定义验证你的props.
      validator (value) {
        return typeof value === 'boolean'
      }
    },
    propOne: String
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
  }
}

new Vue({
  components: {
    CompOne: component
  },
  data: {
    prop1: 'text1'
  },
  mounted () {
    console.log(this.$refs.comp1)
  },
  methods: {
    handleChange () {
      this.prop1 += 1
    }
  },
  el: '#root',
  template: `
  <div>
    <comp-one ref="comp1" :active="true" :prop-one="prop1" @change="handleChange"></comp-one>
    <comp-one :active="false" ></comp-one>
  </div>
  `
})
