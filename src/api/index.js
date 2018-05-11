/*
* @Author: beyondouyuan
* @Date:   2018-04-26 12:50:07
* @Last Modified by:   beyondouyuan
* @Last Modified time: 2018-05-07 21:02:08
*/
import qs from 'qs'
import jsonp from 'jsonp'
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
            url: `${parseAPI('paymentCode')}/${params.paymentCode}`,
            method: 'get'
        })
        .then(res => res.data)
}

/**
 * 扫码后用户向商家支付
 *
 * @param      {<type>}  data    The data
 * @return     {<type>}  { description_of_the_return_value }
 */
export const requestCpay = data => {
    return request({
            url: parseAPI('cpay'),
            method: 'post',
            data: qs.stringify({
                ...data
            }) // 使用qs.stringify传输form data格式 ，否则为json对象格式
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
export const requestSmsCode = params => {
    return request({
            url: parseAPI('wxsendSmsCode'),
            method: 'get',
            params
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
            data:qs.stringify({
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
            method: 'get',
            params
        })
        .then(res => res.data)
}

/**
 * 授权重定向
 *
 * @param      {<type>}  params  The parameters
 * @return     {<type>}  { description_of_the_return_value }
 */
export const requestAuthorizeUrl = params => {
    return request({
            url: parseAPI('authorizeUrl'),
            method: 'get',
            params
        })
        .then(res => res.data)
}


/**
 * 获取openId
 *
 * @param      {<type>}  params  The parameters
 * @return     {<type>}  { description_of_the_return_value }
 */
export const requestOpenid = params => {
    return request({
            url: parseAPI('openid'),
            method: 'get',
            params
        })
        .then(res => res.data)
}


/**
 * 判断是否设置支付密码
 * @Author   larrylee
 * @DateTime 2018-05-07T16:59:20+0800
 * @param    {[type]}                 params [description]
 * @return   {[type]}                        [description]
 */
export const requestIsHasPayPwd = params =>{
    return request({
            url: parseAPI('checkIsHasPayPwd'),
            method: 'get',
            params
        })
        .then(res => res.data)
}



/* 键盘侠 你行你上啊 
    ┌───┐   ┌───┬───┬───┬───┐ ┌───┬───┬───┬───┐ ┌───┬───┬───┬───┐ ┌───┬───┬───┐ 
    │Esc│   │ F1│ F2│ F3│ F4│ │ F5│ F6│ F7│ F8│ │ F9│F10│F11│F12│ │P/S│S L│P/B│  ┌┐    ┌┐    ┌┐ 
    └───┘   └───┴───┴───┴───┘ └───┴───┴───┴───┘ └───┴───┴───┴───┘ └───┴───┴───┘  └┘    └┘    └┘ 
    ┌───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───────┐ ┌───┬───┬───┐ ┌───┬───┬───┬───┐ 
    │~ `│! 1│@ 2│# 3│$ 4│% 5│^ 6│& 7│* 8│( 9│) 0│_ -│+ =│ BacSp │ │Ins│Hom│PUp│ │N L│ / │ * │ - │ 
    ├───┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─────┤ ├───┼───┼───┤ ├───┼───┼───┼───┤ 
    │ Tab │ Q │ W │ E │ R │ T │ Y │ U │ I │ O │ P │{ [│} ]│ | \ │ │Del│End│PDn│ │ 7 │ 8 │ 9 │   │ 
    ├─────┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴─────┤ └───┴───┴───┘ ├───┼───┼───┤ + │ 
    │ Caps │ A │ S │ D │ F │ G │ H │ J │ K │ L │: ;│" '│ Enter  │               │ 4 │ 5 │ 6 │   │ 
    ├──────┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴────────┤     ┌───┐     ├───┼───┼───┼───┤ 
    │ Shift  │ Z │ X │ C │ V │ B │ N │ M │< ,│> .│? /│  Shift   │     │ ↑ │     │ 1 │ 2 │ 3 │   │ 
    ├─────┬──┴─┬─┴──┬┴───┴───┴───┴───┴───┴──┬┴───┼───┴┬────┬────┤ ┌───┼───┼───┐ ├───┴───┼───┤ E││ 
    │ Ctrl│    │Alt │         Space         │ Alt│    │    │Ctrl│ │ ← │ ↓ │ → │ │   0   │ . │←─┘│ 
    └─────┴────┴────┴───────────────────────┴────┴────┴────┴────┘ └───┴───┴───┘ └───────┴───┴───┘ 
*/  