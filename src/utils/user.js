import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import { setCookie } from './util'

Vue.use(VueAxios, axios)

// 创建axios实例
// const service = axios.create({
//   baseURL: 'http://localhost:8089', // api的base_url
//   timeout: 10000 // 请求超时时间
// })
export function userLogin(data) {
  // var id
  Vue.axios
    .get('http://localhost:8089/user/login', { params: data })
    .then(response => {
      setCookie('id', response.data.data, 1000 * 60 * 60)
    })
    .catch(response => {
      console.log('login error')
    })
}
