import { Menu } from 'Context/restaurantContext'
import { Cookies } from 'react-cookie'
import { MenuOption, OrderMenu } from './OrderInterface'

const cartCookie = new Cookies()
export const setCookie = (name: string, menu: Menu, cnt: number, selectedOptions: MenuOption[]) => {
  const cookie = getCookie(name) || {}

  const existingMenus = Object.values<OrderMenu>(cookie)

  const existingMenu = existingMenus.find((item) => {
    return item.menu_name === menu.name && isEqualOptions(item.options, selectedOptions)
  })

  if (existingMenu) {
    existingMenu.quantity = (existingMenu.quantity || 0) + cnt
  } else {
    const newMenuId = `${Date.now()}`
    const newMenu = {
      menu_name: menu.name,
      quantity: cnt,
      price: menu.price,
      img: menu.img,
      options: selectedOptions,
    }
    cookie[newMenuId] = newMenu
  }

  const date = new Date()
  date.setHours(date.getHours() + 1)
  return cartCookie.set(name, JSON.stringify(cookie), { path: '/', expires: date })
}
export const isEqualOptions = (options1: MenuOption[], options2: MenuOption[]): boolean => {
  if (options1.length !== options2.length) {
    return false
  }

  for (let i = 0; i < options1.length; i++) {
    const option1 = options1[i]
    const foundOption2 = options2.find((option2) => option2.name === option1.name)

    if (!foundOption2) {
      return false
    }

    const sortedItems1 = [...option1.items].sort((a, b) => a.name.localeCompare(b.name))
    const sortedItems2 = [...foundOption2.items].sort((a, b) => a.name.localeCompare(b.name))

    if (!areItemsEqual(sortedItems1, sortedItems2)) {
      return false
    }
  }

  return true
}

const areItemsEqual = (
  items1: { name: string; price: number }[],
  items2: { name: string; price: number }[],
): boolean => {
  if (items1.length !== items2.length) {
    return false
  }
  for (let i = 0; i < items1.length; i++) {
    const item1 = items1[i]
    const item2 = items2[i]
    if (item1.name !== item2.name || item1.price !== item2.price) {
      return false
    }
  }
  return true
}

export const getCookie = (name: string) => {
  return cartCookie.get(name)
}
export const removeCookie = (name: string, menuId: string) => {
  const cookie = getCookie(name) || {}

  const menuToRemove = Object.keys(cookie).find((key) => {
    return cookie[key].menu_id === menuId
  })

  if (menuToRemove) {
    delete cookie[menuToRemove]
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
    if (typeof value === 'object' && value !== null && value !== undefined && 'quantity' in value) {
      totalItems += (value as { quantity: number }).quantity
    }
  })

  return totalItems
}
