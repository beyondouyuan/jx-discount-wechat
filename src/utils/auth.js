/*
* @Author: beyondouyuan
* @Date:   2018-04-27 15:24:29
* @Last Modified by:   beyondouyuan
* @Last Modified time: 2018-04-28 17:24:22
*/
import Cookies from 'js-cookie'

const Token = 'Token'
const LocalCode = 'LocalCode'

export const getToken = () => {
  return Cookies.get(Token)
}

export const setToken = token => {
  return Cookies.set(Token, token)
}

export const removeToken = () => {
  return Cookies.remove(Token)
}

export const getLocalCode = () => {
    return Cookies.get(LocalCode)
}

export const setLocalCode = code => {
     return Cookies.set(LocalCode, code)
}

export const removeLocalCode = () => {
  return Cookies.remove(LocalCode)
}