/*
 * @Author: beyondouyuan
 * @Date:   2018-03-18 01:48:44
 * @Last Modified by:   beyondouyuan
 * @Last Modified time: 2018-04-28 10:25:56
 * mutations.js 对state进行修改
 */
import Cookies from 'js-cookie'
import * as types from './mutations-types'

const mutations = {
    [types.SET_TOKEN](state, token) {
        state.token = token
    },
    [types.SET_ACCOUNT](state, account) {
        state.account = account
        Cookies.set('account', account) // 强制刷新会丢失vuex中的账户信息，则保存到cookies中，然后初始状态树中从cooies中获取
    }
}

export default mutations