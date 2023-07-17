import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
interface HeaderProps {
  HeaderName: string
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
  font-size: 50px;
  text-align: center;
  color: inherit;
  text-decoration: none;
  &:hover {
    transform: translateY(-2px);
    transition: 1s;
  }
`
const StyledImg = styled.img`
  cursor: pointer;
  width: 50px;
  height: 50px;
  left: 500px;
  &:hover {
    transform: translateY(-2px);
    transition: 1s;
  }
`

const Header: React.FC<HeaderProps> = ({ HeaderName }) => {
  return (
    <StyledContainer>
      <StyledLink to="/">{HeaderName}</StyledLink>
      <Link to="/cart">
        <StyledImg src="img/cart-icon.png" alt="장바구니" />
      </Link>
    </StyledContainer>
  )
}

export default Header
