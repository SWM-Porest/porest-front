import { Menu } from 'Context/restaurantContext'
import { Cookies } from 'react-cookie'

const cartCookie = new Cookies()

export const setCookie = (name: string, value: Menu) => {
  const menuId = value._id
  const cookie = getCookie(name) || {}

  if (!cookie[menuId]) {
    cookie[menuId] = 0
  }
  cookie[menuId] += 1

  const date = new Date()
  date.setHours(date.getHours() + 1)
  return cartCookie.set(name, JSON.stringify(cookie), { path: '/', expires: date })
}
export const getCookie = (name: string) => {
  return cartCookie.get(name)
}
