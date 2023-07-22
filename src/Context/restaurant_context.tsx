import { createContext } from 'react'
export interface RestaurantContextData {
  restaurant: Restaurant
  isLoading: boolean
  getRestaurant: (id: string) => void
}
export interface Restaurant {
  name: string
  en_name: string
  categroy: string[]
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
interface Menu {
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
    categroy: [],
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
  isLoading: false,
  getRestaurant: () => null,
}
export const RestaurantContext = createContext<RestaurantContextData>(restaurantContextDefaultValue)
