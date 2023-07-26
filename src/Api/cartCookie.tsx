import { Cookies } from 'react-cookie'

const cartCookie = new Cookies()

export const setCookie = (name: string, value: string) => {
  return cartCookie.set(name, value, { path: '/' })
}
export const getCookie = (name: string) => {
  return cartCookie.get(name)
}
