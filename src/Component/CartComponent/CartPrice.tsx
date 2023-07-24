import MenuPriceCard from 'Component/CartComponent/MenuPriceCard'
import { Cart } from 'model/restaurant'
import React from 'react'
import styled from 'styled-components'
import TotalPrice from './TotalPrice'

interface OwnProps {
  cartprice: Cart
}

function reducer(sum: number, val: number): number {
  return sum + val
}
const CartPrice: React.FC<OwnProps> = ({ cartprice }) => {
  const priceTotal = cartprice.menu.map((el) => el.price).reduce(reducer, 0)

  return (
    <StyledLargeContainer>
      <MenuPriceCard info={cartprice.menu[0]} />
      <MenuPriceCard info={cartprice.menu[1]} />
      <TotalPrice price={priceTotal} />
    </StyledLargeContainer>
  )
}
export default CartPrice

const StyledLargeContainer = styled.div`
  align-items: center;
  justify-content: center;
`
