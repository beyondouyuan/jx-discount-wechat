/*
 * @Author: beyondouyuan
 * @Date:   2018-04-28 09:48:13
 * @Last Modified by:   beyondouyuan
 * @Last Modified time: 2018-05-03 21:39:39
 */

import {
    setToken,
    getToken
} from '@/utils/auth'
import {
    MessageBox,
    Toast,
    Indicator
} from "mint-ui"

import {
    requestWechatLogin
} from '@/api'

export const isWeiXin = () => {
    const ua = window.navigator.userAgent.toLowerCase()
    return ua.match(/MicroMessenger/i) == 'micromessenger' ? true : false
}

export const getQueryString = key => {
    const reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)")
    const result = window.location.search.substr(1).match(reg)
    return result ? decodeURIComponent(result[2]) : null
}

// export const WeiXinLogin = () => {
//     if (isWeiXin()) {
//         // const page = location.href
//         const page = location.hostname
//         console.log(page)
//         const condition = {
//             page
//         }
//         if (!getToken()) { // 若未授权
//             requestWechatLogin(condition).then(res => {
//                 location.href = res
//                 return ''
//             }).catch(e => {
//                 Toast("网络错误,请重试")
//             })
//         } else { // 若已绑定
//             let localCode
//             if (JSON.parse(getQueryString("s")).appid) {
//                 localCode = JSON.parse(getQueryString("s")).appid
//                 setToken(localCode)
//             } else { // 如果未绑定 用本地code
//                 localCode = JSON.parse(getQueryString("s")).code
//                 setToken(localCode)
//                 location.href = `http://${location.host}/html/#/login`
//             }
//         }

//     }
// }



export const WeiXinLogin = () => {
    if (isWeiXin()) {
        const page = location.href
        const condition = {
            page
        }
        if (getQueryString("s") == null) { // 若未授权
            // requestWechatLogin(condition).then(res => {
            //     location.href = res
            //     return ''
            // }).catch(e => {
            //     Toast("网络错误,请重试")
            // })
            location.href = `${page}?s={"code":"001K2jn21501FN1oNUo21eJ8n21K2jn6","openid":"oofNP0rLXPAuSwxQtoSjgzbxv3-s"}`
            // console.log(getQueryString("s"))
            return ''
        } else { // 若已绑定
            let localCode;
            console.log('openid '+JSON.parse(getQueryString("s")).openid)
            if (JSON.parse(getQueryString("s")).openid) {
                localCode = JSON.parse(getQueryString("s")).openid
                return localCode
            } else { // 如果未绑定 用本地code
                localCode = JSON.parse(getQueryString("s")).code
                location.href = `http://${location.host}/login`
            }
        }

    }
}