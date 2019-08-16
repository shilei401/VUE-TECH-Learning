// jsx本身使用的就是js语法
import '../assets/styles/footer.styl'
export default {
  data () {
    return {
      author: 'Jokcy'
    }
  },
  render () { // 区别是把template的内容写在了render方法里面
    return (
      <div id="footer">
        <span>Written by {this.author}</span>
      </div>
    )
  }
}
