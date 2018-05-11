/*
 * @Author: beyondouyuan
 * @Date:   2018-04-08 12:03:42
 * @Last Modified by:   beyondouyuan
 * @Last Modified time: 2018-05-10 14:12:19
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

router.beforeEach((route, redirect, next) => {
    NProgress.start()
    if (getToken()) {
        if (route.path === '/login') {
            next({
                path: '/'
            })
            NProgress.done()
        } else {
            next()
            NProgress.done()
        }
    } else {
        next({
            path: '/'
        })
        NProgress.done()
    }
    // if (!getToken()) {
    //     Toast({
    //         message: '请登录',
    //         duration: 2000
    //     })
    //     next({
    //         path: '/'
    //     })
    //     NProgress.done()
    // } else {
    //     if (getToken() && route.path === '/login') {
    //         next({
    //             path: '/'
    //         })
    //     } else {
    //         next()
    //     }
    // }
})

router.afterEach(() => {
    NProgress.done() // 结束Progress
})