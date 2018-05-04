/*
* @Author: beyondouyuan
* @Date:   2018-04-26 12:54:08
* @Last Modified by:   beyondouyuan
* @Last Modified time: 2018-05-04 09:46:24
*/
import axios from 'axios'
import {
  getToken
} from '@/utils/auth'
import {
  Toast
} from 'mint-ui'
/**
 * [创建axios 实例]
 * @type {[type]}
 */
const service = axios.create({
    // baseURL: process.env.BASE_API,
    baseURL: '/qr/',
    timeout: 5000
})

/**
 * [统一拦截请求]
 * @param  {[type]} config [description]
 * @return {[type]}        [description]
 */
service.interceptors.request.use(config => {
    // console.log(process.env.BASE_API)
    console.log(getToken())
    config.headers['accessToken'] = getToken() || null // 让每个请求携带token--['X-Token']为自定义key 请根据实际情况自行修改
    // config.headers['Access-Control-Allow-Origin'] = "*"
    config.headers['Content-Type'] = "application/json;charset=UTF-8"
    return config
}, error => {
    console.log(error) // 打印测试
    Promise.reject(error)
})
/**
 * [统一拦截响应]
 * @param  {[type]} response [description]
 * @return {[type]}          [description]
 */
service.interceptors.response.use(
    response => response,
    error => {
        console.log('error' + error) // 打印测试
        return Promise.reject(error)
    }
)

export default service
