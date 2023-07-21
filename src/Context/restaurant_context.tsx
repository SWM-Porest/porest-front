import { createContext } from 'react'

export interface RestaurantContextData {
  restaurant: Restaurant
}
interface Restaurant {
  name: string
  category: string
  address: string
  menus: Menu[]
}
interface Menu {
  name: string
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
    category: '',
    address: '',
    menus: [],
  },
}
export const RestaurantContext = createContext<RestaurantContextData>(restaurantContextDefaultValue)
