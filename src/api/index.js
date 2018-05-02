/*
* @Author: beyondouyuan
* @Date:   2018-04-26 12:50:07
* @Last Modified by:   beyondouyuan
* @Last Modified time: 2018-05-02 17:45:35
*/
import qs from 'qs'
import request from '@/utils/request'
import parseAPI from './urls'
import '@/mock'


/**
 * 获取用户付款二维码信息
 *
 * @return     {<type>}  { description_of_the_return_value }
 */
export const requestCodeMsg = () => {
    return request({
            url: parseAPI('codemsg'),
            method: 'get'
        })
        .then(res => res.data)
}

/**
 * 获取二维码扫描状态信息
 *
 * @param      {<type>}  params  The parameters
 * @return     {<type>}  { description_of_the_return_value }
 */
export const requestPaymentCode = params => {
    return request({
            url: parseAPI('paymentCode'),
            method: 'get',
            params
        })
        .then(res => res.data)
}

/**
 * 扫码后用户向商家支付
 *
 * @param      {<type>}  data    The data
 * @return     {<type>}  { description_of_the_return_value }
 */
export const requestPmuOrderNo = data => {
    return request({
            url: parseAPI('pmuOrderNo'),
            method: 'post',
            data: qs.stringify({
                ...data
            })
        })
        .then(res => res.data)
}

/**
 * 充值生成付款码订单接口
 *
 * @param      {<type>}  data    The data
 * @return     {<type>}  { description_of_the_return_value }
 */
export const requestRecharge = data => {
    return request({
            url: parseAPI('recharge'),
            method: 'post',
            data: qs.stringify({
                ...data
            })
        })
        .then(res => res.data)
}

/**
 * 获取充值订单状态
 *
 * @param      {<type>}  params  The parameters
 * @return     {<type>}  { description_of_the_return_value }
 */
export const fetchRecharge = params => {
    return request({
            url: parseAPI('prepaymentNo'),
            method: 'get',
            params
        })
        .then(res => res.data)
}

/**
 * 我的订单
 *
 * @param      {<type>}  params  The parameters
 * @return     {<type>}  { description_of_the_return_value }
 */
export const requestFindMyOrder = params => {
    return request({
            url: parseAPI('findMyOrder'),
            method: 'get',
            params
        })
        .then(res => res.data)
}

/**
 * 首页聚合
 *
 * @param      {<type>}  params  The parameters
 * @return     {<type>}  { description_of_the_return_value }
 */
export const requestWXIndex = params => {
    return request({
            url: parseAPI('wxindex'),
            method: 'get',
            params
        })
        .then(res => res.data)
}


/**
 * 公众号登录
 *
 * @param      {<type>}  data    The data
 * @return     {<type>}  { description_of_the_return_value }
 */
export const requestLogin = params => {
    return request({
            url: parseAPI('wxlogin'),
            method: 'get',
            params
        })
        .then(res => res.data)
}

/**
 * 发送验证码
 *
 * @param      {<type>}  data    The data
 * @return     {<type>}  { description_of_the_return_value }
 */
export const requestSmsCode = data => {
    return request({
            url: parseAPI('wxsendSmsCode'),
            method: 'post',
            data: qs.stringify({
                ...data
            })
        })
        .then(res => res.data)
}

/**
 * 设置支付密码
 *
 * @param      {<type>}  data    The data
 * @return     {<type>}  { description_of_the_return_value }
 */
export const requestSetPayPassword = data => {
    return request({
            url: parseAPI('wxsetPayPassword'),
            method: 'post',
            data: qs.stringify({
                ...data
            })
        })
        .then(res => res.data)
}

/**
 * 微信登录授权
 *
 * @param      {<type>}  data    The data
 * @return     {<type>}  { description_of_the_return_value }
 */
export const requestWechatLogin = params => {
    return request({
            url: parseAPI('wechatAppLogin'),
            method: 'GET',
            params
        })
        .then(res => res.data)
}
