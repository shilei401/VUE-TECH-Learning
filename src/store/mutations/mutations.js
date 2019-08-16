export default {
  updateCount (state, num) { // vuex里边它的mutation接受的第二个参数只能是一个 object, 它没有第三个参数的一说
    state.count = num
  }
}
