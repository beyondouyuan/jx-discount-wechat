/*
 * @Author: beyondouyuan
 * @Date:   2018-03-18 01:51:39
 * @Last Modified by:   beyondouyuan
 * @Last Modified time: 2018-05-08 16:15:43
 * state.js 定义管理所有的数据状态，即存放数据的地方
 */

import {
    getToken
} from '@/utils/auth'
import Cookies from 'js-cookie'

const state = {
    account: Cookies.get('account'),
    // token: getToken(),
    token: '',
}

export default state