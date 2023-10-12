import { Image } from 'Context/restaurantContext'

export interface OptionItem {
  name: string
  price: number
}

export interface MenuOption {
  _id: string
  name: string
  isSoldOut: boolean
  maxSelect: number
  items: OptionItem[]
}

export interface OrderMenu {
  menu_name: string
  price: number
  quantity: number
  img: Image
  options: MenuOption[]
}

export interface Order {
  restaurant_id: string
  restaurant_name: string
  restaurant_address: string
  updated_at: string
  _id: string
  menus: { [menuId: string]: OrderMenu }
  status: number
  status_updated_at: { [status: number]: string }
  created_at: string
}
