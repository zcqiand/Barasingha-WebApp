import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// 请求拦截器
service.interceptors.request.use(
  config => {
    // 在发送请求之前做一些事情
    if (store.getters.AccessToken) {
      // 让每个请求都带有令牌
      config.headers['Authorization'] = 'Bearer ' + store.getters.AccessToken
    }
    return config
  },
  error => {
    // 做一些请求错误
    console.log('request:' + error) // for debug
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    return response
  },
  error => {
    console.log('response:' + error) // for debug
    Message({
      type: 'error',
      message: error.message,
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
