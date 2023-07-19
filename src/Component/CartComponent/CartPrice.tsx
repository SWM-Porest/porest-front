import MenuPriceCard from 'Component/CartComponent/MenuPriceCard'
import { Cart } from 'model/restaurant'
import React from 'react'
import styled from 'styled-components'

interface OwnProps {
  cartprice: Cart
}
const StyledContainer = styled.div`
  width: 100%;
  background-color: lightgray;
  font-size: 30px;
  border-radius: 25px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`
const StyledLargeContainer = styled.div`
  width: 100%;
  align-items: center;
  justify-content: center;
`
const StyledH2 = styled.h2`
  margin: 30px;
`
const StyledP = styled.p`
  margin: 30px;
  font-size: 30px;
  color: #ff4d00;
  font-weight: bold;
`

const CartPrice: React.FC<OwnProps> = ({ cartprice }) => {
  return (
    <StyledLargeContainer>
      <MenuPriceCard info={cartprice.menu[0]} />
      <MenuPriceCard info={cartprice.menu[1]} />
      <StyledContainer>
        <StyledH2> Total </StyledH2>
        <StyledP>{cartprice.menu[0].price + cartprice.menu[1].price}원</StyledP>
      </StyledContainer>
    </StyledLargeContainer>
  )
}
export default CartPrice
