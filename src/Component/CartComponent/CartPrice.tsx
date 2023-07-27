import { getCookie } from 'Api/cartCookie'
import { Menu, useRestaurantState } from 'Context/restaurantContext'
import React from 'react'
import styled from 'styled-components'
import MenuPriceCard from './MenuPriceCard'
import TotalPrice from './TotalPrice'
function reducer(sum: number, val: number): number {
  return sum + val
}
const CartPrice: React.FC = () => {
  const { data: restaurant, loading, error } = useRestaurantState().restaurant
  const cookie = getCookie('cart')
  let priceTotal = 0
  for (const [key, value] of Object.entries(cookie)) {
    console.log(`${key}: ${value}`)
    const tmp = restaurant?.menus.find((e) => {
      return e._id === key
    })?.price
    priceTotal += (tmp as number) * (value as number)
  }
  console.log(Object.keys(cookie), 'cookie keys')
  return (
    <StyledLargeContainer>
      {Object.keys(cookie).map((menuId) => (
        <MenuPriceCard
          key={menuId}
          info={
            restaurant?.menus.find((e) => {
              return e._id === menuId
            }) as Menu
          }
          cnt={cookie[menuId]}
        />
      ))}
      <TotalPrice price={priceTotal} />
    </StyledLargeContainer>
  )
}
export default CartPrice

const StyledLargeContainer = styled.div`
  align-items: center;
  justify-content: center;
`
