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
    delete cookie[menuId]
    const date = new Date()
    date.setHours(date.getHours() + 1)
    return cartCookie.set(name, JSON.stringify(cookie), { path: '/', expires: date })
  }
  return cartCookie.set(name, JSON.stringify(cookie), { path: '/' })
}
export const getTotalCartItems = (name: string): number => {
  const cookie = getCookie(name) || {}
  let totalItems = 0

  Object.values(cookie).forEach((value) => {
    if (typeof value === 'number') {
      totalItems += value
    }
  })

  return totalItems
}
