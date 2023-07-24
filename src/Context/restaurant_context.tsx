import { createContext } from 'react'

export interface RestaurantContextData {
  restaurant: Restaurant
}

export interface Restaurant {
  name: string
  en_name: string
  category: string[]
  img: string[]
  intro: string
  notice: string
  phone_number: string
  address: string
  created_at: string
  updated_at: string
  status: number
  menus: Menu[]
}

export interface Menu {
  name: string
  en_name: string
  menutype: string
  price: number
  category: string
  description: string
  img: string
  ingre: string[]
}

export const restaurantContextDefaultValue: RestaurantContextData = {
  restaurant: {
    name: '',
    en_name: '',
    category: [],
    img: [],
    intro: '',
    notice: '',
    phone_number: '',
    address: '',
    created_at: '',
    updated_at: '',
    status: 1,
    menus: [],
  },
}

export const RestaurantContext = createContext<RestaurantContextData>(restaurantContextDefaultValue)
