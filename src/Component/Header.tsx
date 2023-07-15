import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
interface HeaderProps {
  restaurantName: string
}
const StyledContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100px;
  background-color: #f2f2f2;
  width: 100%;
`
const StyledLink = styled(Link)`
  cursor: pointer;
  font-size: 20px;
  text-align: center;
`
const StyledImg = styled.img`
  cursor: pointer;
  width: 20px;
  height: 20px;
`

const Header: React.FC<HeaderProps> = ({ restaurantName }) => {
  return (
    <StyledContainer>
      <StyledLink to="/">{restaurantName}</StyledLink>
      <Link to="/cart">
        <StyledImg src="img/cart-icon.png" alt="장바구니" />
      </Link>
    </StyledContainer>
  )
}

export default Header
