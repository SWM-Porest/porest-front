// let data = {
//     name: 'restaurants name',
//     category: 'western',
//     address:{
//       city: 'incheoi',
//       detail:'somewhere',
//       zipCode:2342345
//     },
//     menu:[{name: "rose pasta", price:2000,category:"PASTA"},{name: "garlic steak", price:3000, category:"PASTA" }]
//   }

export type Restaurant = {
  name: string
  category: string
  address: Address
  menu: Menu[]
}

export type Address = {
  city: string
  detail: string
  zipCode: number
}

export interface Menu {
  name: string
  price: number
  category: string
}
