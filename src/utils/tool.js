/*
* @Author: beyondouyuan
* @Date:   2018-04-28 09:48:13
* @Last Modified by:   beyondouyuan
* @Last Modified time: 2018-05-02 18:34:52
*/

import {
    setToken,
    getToken
} from '@/utils/auth'

import { requestWechatLogin } from '@/api'

export const isWeiXin = () => {
    const ua = window.navigator.userAgent.toLowerCase()
    return ua.match(/MicroMessenger/i) == 'micromessenger' ? true : false
}

export const getQueryString = key => {
  const reg = new RegExp("(^|&)"+key+"=([^&]*)(&|$)")
  const result = window.location.search.substr(1).match(reg)
  return result ? decodeURIComponent(result[2]) : null
}

export const WeiXinLogin = () => {
    // if (isWeiXin()) {
        console.log(isWeiXin())
        const page = location.href
        const condition = {
            page 
        }
        let localCode;
        requestWechatLogin(condition).then(res => {
            debugger;
            console.log(res)
                // localCode = JSON.parse(getQueryString("s")).token
                // setToken(localCode)
                // location.href = res
            })
        // 未授权
        // if (!getToken()) {
        //     requestWechatLogin(condition).then(res => {
        //         localCode = JSON.parse(getQueryString("s")).token
        //         setToken(localCode)
        //         location.href = res
        //     })
        // } else {
        //     // 若已绑定账号，获取url上的token并存储在本地
        //     if (JSON.parse(getQueryString("s")).token) {
        //         localCode = JSON.parse(getQueryString("s")).token
        //         setToken(localCode)
        //     } else {
        //         // 若未绑定 用本地code
        //         localCode = JSON.parse(getQueryString("s")).code
        //         location.href = `http://${location.host}/#/login?accessToken=${localCode}`
        //         setToken(localCode)
        //     }
        // }
    // }
}