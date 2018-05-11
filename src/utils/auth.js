/*
* @Author: beyondouyuan
* @Date:   2018-04-27 15:24:29
* @Last Modified by:   beyondouyuan
* @Last Modified time: 2018-05-09 21:29:44
*/
import Cookies from 'js-cookie'

const Token = 'Token'
const LocalCode = 'LocalCode'
const OpenId = 'OpenId'

export const getToken = () => {
  // return Cookies.get(Token)
  return localStorage.getItem(Token)
}

export const setToken = token => {
  // return Cookies.set(Token, token)
  return localStorage.setItem(Token, token)
}

export const removeToken = () => {
  // return Cookies.remove(Token)
  return localStorage.removeItem(Token)
}

export const getOpenId = () => {
  // return Cookies.get(OpenId)
  return localStorage.getItem(OpenId)
}

export const setOpenId = openid => {
  // return Cookies.set(OpenId, openid)
  return localStorage.setItem(OpenId, openid)
}

export const removeOpenId = () => {
  // return Cookies.remove(OpenId)
  return localStorage.removeItem(OpenId)
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