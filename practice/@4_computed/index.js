import Vue from 'vue'

// 简单场景
// new Vue({
//   el: '#root',
//   template: `
//     <div>
//         <span>Name: {{firstName + ' ' + lastName}}</span>
//     </div>
//   `,
//   data: {
//     firstName: 'Jokcy',
//     lastName: 'Lou'
//   }
// })

// computed 与 method的对比
// new Vue({
//   el: '#root',
//   template: `
//     <div>
//         <p>Name: {{ name }}</p>
//         <p>Name: {{ getName() }}</p>
//         <p>Number: {{number}}</p>
//         <p><input type="text" v-model="number" /></p>
//         <p>FirstName: <input type="text" v-model="firstName" /></p>
//         <p>LastName: <input type="text" v-model="lastName" /></p>
//     </div>
//   `,
//   data: {
//     firstName: 'Jokcy',
//     lastName: 'Lou',
//     number: 0
//   },
//   computed: {
//     name () {
//       console.log('new name')
//       return `${this.firstName} ${this.lastName}`
//     }
//   },
//   methods: {
//     getName () {
//       console.log('getName invoke')
//       return `${this.firstName} ${this.lastName}`
//     }
//   }
// })

// watch的使用场景
// new Vue({
//   el: '#root',
//   template: `
//     <div>
//         <p>FullName: {{fullName}}</p>
//         <p>FirstName: <input type="text" v-model="firstName" /></p>
//         <p>LastName: <input type="text" v-model="lastName" /></p>
//     </div>
//   `,
//   data: {
//     firstName: 'Jokcy',
//     lastName: 'Lou',
//     fullName: ''
//   },
//   // watch: {
//   //   firstName (newName, oldName) {
//   //     this.fullName = newName + ' ' + this.lastName
//   //   }
//   // }
//   watch: {
//     firstName: {
//       handler (newName, oldName) {
//         this.fullName = newName + ' ' + this.lastName
//       },
//       immediate: true
//     }
//   }
// })

// watch的深度观察
new Vue({
  el: '#root',
  template: `
    <div>
        <p>Obj.a: <input type="text" v-model="obj.a" /></p>
    </div>
  `,
  data: {
    obj: {
      a: '123'
    }
  },
  watch: {
    obj: {
      handler (newName, oldName) {
        console.log('obj.a changed')
      },
      immediate: true,
      deep: false
    }
  }
  // mounted () {
  //   this.obj = { a: '345' }
  // }
})
