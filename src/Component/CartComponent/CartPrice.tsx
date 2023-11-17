import { getCookie } from 'Api/cartCookie'
import { useRestaurantState } from 'Context/restaurantContext'
import React, { useEffect, useState } from 'react'
import MenuPriceCard from './MenuPriceCard'
import TotalPrice from './TotalPrice'

const CartPrice: React.FC = () => {
  const { data: restaurant } = useRestaurantState().restaurant
  const cookie = getCookie(restaurant?._id as string) || {}
  const [priceTotal, setPriceTotal] = useState(0)

  useEffect(() => {
    let total = 0
    for (const key of Object.keys(cookie)) {
      const menuItem = cookie[key]

      if (menuItem && menuItem.menu_name) {
        const menuPrice = menuItem.price
        const menuOptions = menuItem.options || []
        let optionPrice = 0

        for (const option of menuOptions) {
          if (option && option.items && option.items.length > 0) {
            for (const item of option.items) {
              optionPrice += item.price
            }
          }
        }

        const orderTotalPrice = (menuPrice + optionPrice) * menuItem.quantity
        total += orderTotalPrice
      }
    }

    setPriceTotal(total)
  }, [cookie, restaurant?.menus])

  const handlePriceTotalChange = () => {
    let total = 0

    const updatedCookie = getCookie(restaurant?._id as string) || {}

    for (const [key, value] of Object.entries(updatedCookie)) {
      const menuPrice = restaurant?.menus.find((e) => e._id === key)?.price

      if (menuPrice) {
        total += menuPrice * (value as number)

        if (typeof value === 'object') {
          const order = value as { count: number; price: number; options: any }

          if (order.options && typeof order.options === 'object') {
            for (const optionName in order.options) {
              if (Object.prototype.hasOwnProperty.call(order.options, optionName)) {
                const optionArray = order.options[optionName]
                if (Array.isArray(optionArray)) {
                  for (const option of optionArray) {
                    total += option.price * order.count
                  }
                }
              }
            }
          }
        }
      }
    }

    setPriceTotal(total)
  }

  return (
    <div>
      {Object.keys(cookie).map((key) => {
        const order = cookie[key]
        if (order && order.menu_name) {
          return (
            <MenuPriceCard
              key={key}
              info={{
                name: order.menu_name,
                price: order.price,
                img: order.img,
                isSoldOut: order.isSoldOut,
                en_name: restaurant?.menus.find((e) => e._id === key)?.en_name || '',
                category: restaurant?.menus.find((e) => e._id === key)?.category || '',
                description: restaurant?.menus.find((e) => e._id === key)?.description || '',
                ingre: restaurant?.menus.find((e) => e._id === key)?.ingre || [],
                _id: order.menu_id,
                menuOptions: order.options,
              }}
              orderinfo={{ count: order.quantity, menu_id: key }}
              handlePriceTotalChange={handlePriceTotalChange}
            />
          )
        }
        return null
      })}
      <TotalPrice price={priceTotal} />
    </div>
  )
}
export default CartPrice
