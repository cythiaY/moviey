// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// import VueResource from 'vue-resource'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.config.productionTip = false
Vue.use(ElementUI)

// router.afterEach((to, from, next) => {
//   setTimeout(() => {
//     var _mtac = {};
//     (function() {
//       var mta = document.createElement('script')
//       mta.src = 'http://pingjs.qq.com/h5/stats.js?v2.0.2'
//       mta.setAttribute('name', 'MTAH5')
//       mta.setAttribute('sid', '500602559')
//       var s = document.getElementsByTagName('script')[0]
//       s.parentNode.insertBefore(mta, s)
//     })()
//   }, 0)
// })
/* eslint-disable */
new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
})