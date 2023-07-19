import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
interface HeaderProps {
  HeaderName: string
}
const StyledNavbar = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #f2f2f2;
  padding: 10px 20px;
`
const StyledLink = styled(Link)`
  cursor: pointer;
  font-size: 30px;
  text-align: center;
  color: inherit;
  text-decoration: none;
`
const StyledH2 = styled.h2`
  margin: 0px;
  font-family: 'Noto Serif KR', serif;
`
const StyledImg = styled.img`
  cursor: pointer;
  width: 50px;
  height: 50px;
  left: 500px;
`

const Header: React.FC<HeaderProps> = ({ HeaderName }) => {
  return (
    <StyledNavbar>
      <div></div>
      <StyledLink to="/">
        <StyledH2>{HeaderName}</StyledH2>
      </StyledLink>
      <Link to="/cart">
        <StyledImg src="img/cart-icon.png" alt="장바구니" />
      </Link>
    </StyledNavbar>
  )
}

export default Header
