import { Cart } from 'model/restaurant'
import React from 'react'
import styled from 'styled-components'

interface OwnProps {
  cartprice: Cart
}
const StyledContainer = styled.div`
  text-align: center;
  padding: 20px;
  margin: 10px;
  background-color: lightgray;
  font-size: 30px;
`

const CartPrice: React.FC<OwnProps> = ({ cartprice }) => {
  return (
    <div>
      <StyledContainer>
        <h4>{cartprice.menu[0].name}</h4>
        <div>{cartprice.menu[0].price}</div>
      </StyledContainer>
      <StyledContainer>
        <h4>{cartprice.menu[1].name}</h4>
        <div>{cartprice.menu[1].price}</div>
      </StyledContainer>
      <StyledContainer>
        <h2> Total </h2>
        <div>{cartprice.menu[0].price + cartprice.menu[1].price}</div>
      </StyledContainer>
    </div>
  )
}
export default CartPrice
