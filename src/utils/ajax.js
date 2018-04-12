import axios from 'axios'

axios.defaults.timeout = 5000
// axios.defaults.baseURL = 'http://47.106.77.93:8089/api'
axios.defaults.baseURL = 'http://localhost:8089/api'

export function get(url, params = {}) {
  return new Promise((resolve, reject) => {
    axios
      .get(url, {
        params: params
      })
      .then(response => {
        resolve(response.data)
      })
      .catch(err => {
        reject(err)
      })
  })
}

export function post(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.post(url, data).then(
      response => {
        resolve(response.data)
      },
      err => {
        reject(err)
      }
    )
  })
}
