import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'
import Pay from '@/views/Pay'
import Order from '@/views/Order'
import Login from '@/views/Login'
import User from '@/views/User'

Vue.use(Router)

export default new Router({
    mode: 'hash',
    routes: [{
        path: '/',
        name: 'Home',
        component: Home
    }, {
        path: '/login',
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
    }]
})