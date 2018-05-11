import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'
import Pay from '@/views/Pay'
import Order from '@/views/Order'
import Login from '@/views/Login'
import User from '@/views/User'
import Result from '@/views/Result'
import Favoured from '@/views/Favoured'
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
        path: '/pay/:balance',
        name: 'Pay',
        component: Pay
    }, {
        path: '/order',
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
    },{
        path: '/favoured',
        name: 'Favoured',
        component: Favoured
        
    }]
})