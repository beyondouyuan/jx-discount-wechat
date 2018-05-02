// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import MintUI from 'mint-ui'

import Loading from '@/components/Loading'

import 'mint-ui/lib/style.css'
import  'lib-flexible'
import './assets/style/index.scss'

import store from '@/store'
import * as filters from './filters' // 全局filter
import './permission'  // 路由拦截


Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})
Vue.config.productionTip = false

Vue.use(MintUI)

// 全局组件Loading
Vue.component('Loading', Loading)


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
