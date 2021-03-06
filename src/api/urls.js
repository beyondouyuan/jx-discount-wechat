/*
* @Author: beyondouyuan
* @Date:   2018-04-26 12:50:16
* @Last Modified by:   beyondouyuan
* @Last Modified time: 2018-05-03 21:15:26
*/
const urls = {
    'codemsg': '/pmu/codemsg', // 获取用户付款二维码信息接口
    'paymentCode': '/pmu/status', // 获取二维码扫描状态信息
    'cpay': '/qr/cpay/', // 扫码后用户向商家支付接口
    'recharge': '/qr/recharge', // 充值生成付款码订单接口
    'prepaymentNo': '/qr/recharge', // 获取充值订单状态接口
    'findMyOrder': '/qr/wx/findMyOrder', // 我的订单
    'wxindex': '/qr/wx/index', // 首页聚合接口
    'wxlogin': '/login/phone/wx', // 用户公众号登录
    'wxsendSmsCode': '/login/sendVerifyCode', // 发送验证码
    'wxsetPayPassword': '/qr/wx/setPayPassword', // 设置支付密码
    'wechatAppLogin': '/wx/wechatAppLogin', // 微信登录授权
    'checkIsHasPayPwd': '/qr/wx/checkIsHasPayPwd', //查询是否设置支付密码
    'authorizeUrl': '/qr/wx/getWechatAuthorizeUrl',
    'openid': '/qr/wx/getWechatOpenId'
}
const parseAPI = api => {
    return `${urls[api]}`
}

export default parseAPI