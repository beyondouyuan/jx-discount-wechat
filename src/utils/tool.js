/*
 * @Author: beyondouyuan
 * @Date:   2018-04-28 09:48:13
 * @Last Modified by:   beyondouyuan
 * @Last Modified time: 2018-05-10 15:09:52
 */

import {
    setToken,
    getToken,
    getOpenId,
    setOpenId,
    removeOpenId
} from '@/utils/auth'
import {
    MessageBox,
    Toast,
    Indicator
} from "mint-ui"

import {
    requestWechatLogin,
    requestAuthorizeUrl,
    requestOpenid
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


export const getQueryHashString = key => {
    var link = location.href;
    if (link.indexOf('?') != -1) {
        var result = link.substr(link.lastIndexOf('?') + 1);
        return decodeURIComponent(result)
    } else {
        return null
    }
}


export const WeiXinLogin = () => {
    if (isWeiXin()) {
        const page = location.href
        const condition = {
            page
        }
        const query = getQueryHashString()
        if (query == null && !getToken()) {
            requestAuthorizeUrl(condition).then(res => {
                const {
                    data
                } = res
                window.location.href = data
                return ''
            })
        } else {
            // getOpenId() == '' || getOpenId() == null || getOpenId() == undefined
            if (!getOpenId()) {
                const code = query.substring(query.indexOf('=') + 1, query.indexOf('&'))
                const condition = {
                    code
                }
                let localCode;
                if (code) {
                    requestOpenid(condition).then(res => {
                        if (res.code == '0000') {
                            const {
                                data
                            } = res
                            const {
                                openid,
                                token
                            } = data
                            setToken(token)
                            // Toast(res.msg)
                            setOpenId(openid)
                            return openid
                        } else if (res.code == '7000' || res.code == '7001') {
                            // Toast('授权成功')
                            const {
                                data
                            } = res
                            const {
                                openid
                            } = data
                            setOpenId(openid)
                            return openid
                        } else {
                            Toast(res.msg)
                        }
                    })
                }
            }

        }
    }

}