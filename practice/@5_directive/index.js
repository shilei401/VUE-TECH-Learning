import Vue from 'vue'

// new Vue({
//   el: '#root',
//   template: `
//     <div>
//       <div v-text="text"></div>
//       <div v-html="html"></div>
//       <div v-show="active"></div>
//     </div>
//   `,
//   data: {
//     text: 0,
//     active: false,
//     html: '<span>this is html</span>'
//   }
// })

// new Vue({
//   el: '#root',
//   template: `
//     <div>
//       <div v-if="active"></div>
//       <div v-else-if="text === 0">else Text: {{text}}</div>
//       <div v-else>else content</div>
//     </div>
//   `,
//   data: {
//     text: 0,
//     active: false
//   }
// })

// new Vue({
//   el: '#root',
//   template: `
//     <ul>
//       <li v-for="item in arr">{{item}}</li>
//     </ul>
//   `,
//   data: {
//     arr: [1, 2, 3]
//   }
// })

// new Vue({
//   el: '#root',
//   template: `
//     <ul>
//       <li v-for="(item, index) in arr" :key="item">{{item}}:{{index}}</li>
//     </ul>
//   `,
//   data: {
//     arr: [1, 2, 3]
//   }
// })

// new Vue({
//   el: '#root',
//   template: `
//     <ul>
//       <li v-for="(item, index) in arr">{{item}}:{{index}}</li>
//     </ul>
//   `,
//   data: {
//     arr: [1, 2, 3]
//   }
// })

// new Vue({
//   el: '#root',
//   template: `
//     <ul>
//       <li v-for="(val, key, index) in obj">{{val}}:{{key}}:{{index}}</li>
//     </ul>
//   `,
//   data: {
//     obj: {
//       a: 123,
//       b: 456,
//       c: 789
//     }
//   }
// })

// new Vue({
//   el: '#root',
//   template: `
//       <div>
//         <div>Text: {{text}}</div>
//         <input type="text" v-model="text" />
//         <input type="checkbox" v-model="active" />
//       </div>
//   `,
//   data: {
//     text: 0,
//     active: false
//   }
// })

// new Vue({
//   el: '#root',
//   template: `
//       <div>
//         <div>
//           <input type="checkbox"  :value="1" v-model="arr" />
//           <input type="checkbox" :value="2"  v-model="arr" />
//           <input type="checkbox" :value="3" v-model="arr" />
//         </div>
//       </div>
//   `,
//   data: {
//     arr: [2, 3]
//   }
// })

// new Vue({
//   el: '#root',
//   template: `
//       <div>
//           <input type="radio" value="one" v-model="picked" />
//           <input type="radio" value="two" v-model="picked" />
//         </div>
//       </div>
//   `,
//   data: {
//     picked: ''
//   }
// })

// new Vue({
//   el: '#root',
//   template: `
//       <div>
//         <div v-pre>Text: {{text}}</div>
//       </div>
//   `,
//   data: {
//     text: 0
//   }
// })

new Vue({
  el: '#root',
  template: `
      <div>
        <div v-once>Text: {{text}}</div>
      </div>
  `,
  data: {
    text: 0
  }
})
