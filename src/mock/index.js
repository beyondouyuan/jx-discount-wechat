/*
* @Author: beyondouyuan
* @Date:   2018-04-27 15:52:05
* @Last Modified by:   beyondouyuan
* @Last Modified time: 2018-05-02 11:04:31
*/
import Mock from 'mockjs'
import parseAPI from '@/api/urls'

const host = 'https://dev.api.com'

const Random = Mock.Random

export default [
    Mock.mock(`${host}${parseAPI('wxlogin')}`, {
        "msg": "数据请求成功",
        "code": "100",
        "data": {
            "tokenData": Random.string()
        }
    }),
    Mock.mock(`${host}${parseAPI('wxsendSmsCode')}`, {
        "msg": "数据请求成功",
        "code": "100",
        "data": {
            "tokenData": Random.integer(1000, 9999)
        }
    }),
]