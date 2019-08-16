import Vue from 'vue'

// 在模板中可访问的值
// new Vue({
//   el: '#root',
//   template: `
//       <div>
//         {{ isActive ? 'active' : 'not active' }}
//         <p>{{ getJoinedArr }}</p>
//         {{ Date.now() }}
//       </div>
//     `,
//   data: {
//     isActive: false,
//     arr: [1, 2, 3]
//   },
//   computed: {
//     getJoinedArr () {
//       return this.arr.join(' ')
//     }
//   }
// })

// 如何在模板里显示一段html:V-HTML
// new Vue({
//   el: '#root',
//   template: `
//     <div>
//         {{html}}
//     </div>
//   `,
//   data: {
//     html: '<span>123</span>'
//   }
// })

// 在模板中html元素上定义动态属性:V-BIND
// new Vue({
//   el: '#root',
//   template: `
//     <div v-bind:id="aaa">
//     </div>
//   `,
//   data: {
//     aaa: 'main'
//   }
// })

// 在模板中的html元素上绑定事件:V-ON
// new Vue({
//   el: '#root',
//   template: `
// <div v-bind:id="aaa" v-on:click="handleClick">
//         <p v-html="html"></p>
//     </div>
// `,
//   data: {
//     html: '<span>123</span>',
//     aaa: 'main'
//   },
//   methods: {
//     handleClick () {
//       alert('clicked')
//     }
//   }
// })

// 给html元素动态绑定class属性
// 方式1 :class=""里边是一个对象
// new Vue({
//   el: '#root',
//   template: `
//     <div :class="{ active:  !isActive}">
//         <p v-html="html"></p>
//     </div>
// `,
//   data: {
//     isActive: false,
//     html: '<span>123</span>'
//   }
// })
// 方式2 :class=””里面是一个数组
// new Vue({
//   el: '#root',
//   template: `
//     <div :class="[!isActive ? 'active' : '' ]">
//         <p v-html="html"></p>
//     </div>
// `,
//   data: {
//     isActive: false,
//     html: '<span>123</span>'
//   }
// })
// 方式2: 使用computed中定义一个函数，该函数返回一个对象/数组
// new Vue({
//   el: '#root',
//   template: `
//     <div :class="classNames">
//         <p v-html="html"></p>
//     </div>
//   `,
//   data: {
//     isActive: false,
//     html: '<span>123</span>'
//   },
//   computed: {
//     classNames () {
//       return [{ active: !this.isActive }]
//     }
//   }
// })

// 给html元素动态绑定style属性
new Vue({
  el: '#root',
  template: `
    <div :style="styles">
        <p v-html="html"></p>
    </div>
  `,
  data: {
    html: '<span>123</span>'
  },
  computed: {
    styles () {
      return [{
        color: 'red',
        appearance: 'none'
      }, {
        fontSize: '20px'
      }]
    }
  }
})
