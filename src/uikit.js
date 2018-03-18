import 'jquery'
import 'uikit'
import 'uikit-css'

export default (Vue, options) => {

    // 向实例注入UIkit的类方法
    Vue.prototype.$ui = {
      notification: UIkit.notification
    }
}