import { getCookie } from 'Api/cartCookie'
import { Menu, useRestaurantState } from 'Context/restaurantContext'
import React, { useEffect, useState } from 'react'
import MenuPriceCard from './MenuPriceCard'
import TotalPrice from './TotalPrice'

const CartPrice: React.FC = () => {
  const { data: restaurant } = useRestaurantState().restaurant
  const cookie = getCookie(restaurant?._id as string) || {}
  const [priceTotal, setPriceTotal] = useState(0) // state로 priceTotal 관리
  useEffect(() => {
    let total = 0
    for (const [key, value] of Object.entries(cookie)) {
      const tmp = restaurant?.menus.find((e) => e._id === key)?.price
      total += (tmp as number) * (value as number)
    }
    setPriceTotal(total)
  }, [cookie, restaurant?.menus])
  const handlePriceTotalChange = () => {
    const updatedCookie = getCookie(restaurant?._id as string) || {}
    let total = 0
    for (const [key, value] of Object.entries(updatedCookie)) {
      const tmp = restaurant?.menus.find((e) => e._id === key)?.price
      total += (tmp as number) * (value as number)
    }
    setPriceTotal(total)
  }
  return (
    <div>
      {Object.keys(cookie).map((menuId) => (
        <MenuPriceCard
          key={menuId}
          info={
            restaurant?.menus.find((e) => {
              return e._id === menuId
            }) as Menu
          }
          cnt={cookie[menuId]}
          handlePriceTotalChange={handlePriceTotalChange} // 콜백 함수 전달
        />
      ))}
      <TotalPrice price={priceTotal} />
    </div>
  )
}
export default CartPrice
