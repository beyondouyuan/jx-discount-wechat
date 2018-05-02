/*
 * @Author: beyondouyuan
 * @Date:   2018-04-08 12:03:42
 * @Last Modified by:   beyondouyuan
 * @Last Modified time: 2018-05-02 10:56:47
 */
import router from '@/router'
import store from '@/store'
import {
  Toast
} from 'mint-ui'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css' // Progress 进度条样式
import {
  getToken,
  removeToken
} from '@/utils/auth'

// router.beforeEach((route, redirect, next) => {
//   NProgress.start()
//   if (getToken() && route.path === '/login') {
//     removeToken()
//     next()
//     NProgress.done()
//   }
//   if (!getToken() && route.path !== '/login') {
//     Toast({
//       message: '请登录',
//       duration: 2000
//     })
//     next({
//       path: '/login'
//     })
//   } else {
//     if (getToken()) {
//       console.log('hasLogin')
//     }
//     if (route.path) {
//       next()
//     } else {
//       next({
//         path: '/404'
//       })
//     }
//   }
// })

// router.afterEach(() => {
//   NProgress.done() // 结束Progress
// })