export type Restaurant = {
  name: string
  category: string
  address: Address
  menus: Menu[]
}
export type Cart = {
  menu: Menu[]
}
export type Address = {
  city: string
  detail: string
  zipCode: number
}

export type Menu = {
  name: string
  menutype: string
  price: number
  category: string
  description: string
  img: string
  ingre: string[]
}
