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
      const value = cookie[key]

      if (typeof value === 'object') {
        const order = value as { count: number; price: number; options: any }

        let orderTotalPrice = order.count * order.price

        if (order.options && typeof order.options === 'object') {
          for (const optionName in order.options) {
            if (Object.prototype.hasOwnProperty.call(order.options, optionName)) {
              const optionArray = order.options[optionName]
              if (Array.isArray(optionArray)) {
                for (const option of optionArray) {
                  orderTotalPrice += option.price * order.count
                }
              }
            }
          }
        }
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
      {Object.keys(cookie).map((menuId) => {
        console.log('cookie: ', cookie[menuId].menuId)
        const menu = restaurant?.menus.find((e) => e._id === cookie[menuId].menuId)
        if (menu) {
          return (
            <MenuPriceCard
              key={menuId}
              info={menu}
              orderinfo={cookie[menuId]}
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
