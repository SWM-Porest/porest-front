import { Menu } from 'Context/restaurantContext'
import { Cookies } from 'react-cookie'
import { OptionItem } from './OrderInterface'

const cartCookie = new Cookies()
export const setCookie = (
  name: string,
  menu: Menu,
  cnt: number,
  selectedOptions: { [optionId: string]: OptionItem[] },
) => {
  const menuId = menu._id
  const cookie = getCookie(name) || {}

  const existingMenus = Object.values(cookie)

  const existingMenu = existingMenus.find((item: any) => {
    return item.menuId === menuId && isEqualOptions(item.options, selectedOptions)
  }) as any
  if (existingMenu) {
    existingMenu.count = (existingMenu.count || 0) + cnt
  } else {
    const newMenuId = `${Date.now()}`
    const newMenu = {
      menuId,
      count: cnt,
      price: menu.price,
      options: selectedOptions,
    }
    cookie[newMenuId] = newMenu
  }

  const date = new Date()
  date.setHours(date.getHours() + 1)
  return cartCookie.set(name, JSON.stringify(cookie), { path: '/', expires: date })
}
export const isEqualOptions = (
  options1: { [optionId: string]: { name: string; price: number }[] },
  options2: { [optionId: string]: { name: string; price: number }[] },
) => {
  const optionKeys1 = Object.keys(options1)
  const optionKeys2 = Object.keys(options2)

  if (optionKeys1.length !== optionKeys2.length) {
    return false
  }

  for (const optionId of optionKeys1) {
    if (!optionKeys2.includes(optionId)) {
      return false
    }

    const optionValue1 = options1[optionId]
      .map((option) => option.name)
      .sort()
      .join(',')
    const optionValue2 = options2[optionId]
      .map((option) => option.name)
      .sort()
      .join(',')

    if (optionValue1 !== optionValue2) {
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
    return cookie[key].menuId === menuId
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
    if (typeof value === 'object' && value !== null && value !== undefined && 'count' in value) {
      totalItems += (value as { count: number }).count
    }
  })

  return totalItems
}
