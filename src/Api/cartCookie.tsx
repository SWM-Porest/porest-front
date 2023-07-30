import { Menu } from 'Context/restaurantContext'
import { Cookies } from 'react-cookie'

const cartCookie = new Cookies()

export const setCookie = (name: string, value: Menu, cnt: number) => {
  const menuId = value._id
  const cookie = getCookie(name) || {}
  if (!cookie[menuId]) {
    cookie[menuId] = 0
  }
  cookie[menuId] += cnt

  const date = new Date()
  date.setHours(date.getHours() + 1)
  return cartCookie.set(name, JSON.stringify(cookie), { path: '/', expires: date })
}
export const getCookie = (name: string) => {
  return cartCookie.get(name)
}
export const removeCookie = (name: string, menuId: string) => {
  const cookie = getCookie(name) || {}

  if (cookie[menuId]) {
    delete cookie[menuId] // 특정 id 값의 key-value 쌍을 삭제
    const date = new Date()
    date.setHours(date.getHours() + 1)
    return cartCookie.set(name, JSON.stringify(cookie), { path: '/', expires: date })
  }

  // 이미 해당 id 값이 존재하지 않는 경우에는 그대로 쿠키를 반환
  return cartCookie.set(name, JSON.stringify(cookie), { path: '/' })
}
