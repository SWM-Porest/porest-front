import { getCookie } from 'Api/cartCookie'
import { Menu, useRestaurantState } from 'Context/restaurantContext'
import React from 'react'
import styled from 'styled-components'
import MenuPriceCard from './MenuPriceCard'
import TotalPrice from './TotalPrice'

const CartPrice: React.FC = () => {
  const { data: restaurant } = useRestaurantState().restaurant
  const cookie = getCookie(restaurant?._id as string) || {}
  let priceTotal = 0
  for (const [key, value] of Object.entries(cookie)) {
    const tmp = restaurant?.menus.find((e) => {
      return e._id === key
    })?.price
    priceTotal += (tmp as number) * (value as number)
  }

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
