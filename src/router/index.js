import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'
import Pay from '@/views/Pay'
import Order from '@/views/Order'
import Login from '@/views/Login'
import User from '@/views/User'
import Result from '@/views/Result'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [{
        path: '/',
        name: 'Home',
        component: Home
    }, {
        path: '/login/:openid',
        name: 'Login',
        component: Login
    }, {
        path: '/pay/:id',
        name: 'Pay',
        component: Pay
    }, {
        path: '/order/:id',
        name: 'Order',
        component: Order
    }, {
        path: '/user/:mobile',
        name: 'User',
        component: User
    }, {
        path: '/result/:state',
        name: 'Result',
        component: Result
    }]
})