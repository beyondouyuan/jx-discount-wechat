/*
* @Author: beyondouyuan
* @Date:   2018-03-18 01:47:48
* @Last Modified by:   beyondouyuan
* @Last Modified time: 2018-05-03 20:09:45
* actions.js 即对数据进行各种操作，即通过commit给mutaions实现
*/

import * as types from './mutations-types'
import { setToken, removeToken } from '@/utils/auth'
import { requestLogin } from '@/api'

/**
 * 异步登录
 *
 * @class      LoginAction (name)
 * @param      {Object}    arg1         The argument 1
 * @param      {Function}  arg1.commit  The commit
 * @param      {<type>}    accountData  The account data
 * @return     {Promise}   { description_of_the_return_value }
 */
export const LoginAction = ({commit}, accountData) => {
    return new Promise((resolve, reject) => {
        requestLogin(accountData).then(res => {
            console.log(res)
            const { token } = res.data
            commit(types.SET_TOKEN, token)
            setToken(token)
            resolve(res)
        }).catch(e => {
            console.log(e)
            resolve(e)
        })
    })
}



export const WeiXinLoginAction = ({commit}, data) => {
    
}