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
  background-color: #1d1b1b;
  padding: 20px 50px;
`
const StyledLink = styled(Link)`
  cursor: pointer;
  font-size: 40px;
  text-align: center;
  color: inherit;
  text-decoration: none;
`

const StyledH2 = styled.h2`
  margin: 20px 0 0 0;
  color: #edcc12;
`
const StyledTransparent = styled.p`
  color: #edcc125f;
  position: absolute;
  top: 40px;
  font-size: 25px;
  right: 205px;
  font-family: 'Noto Serif KR', serif;
`

const StyledImg = styled.img`
  cursor: pointer;
  width: 50px;
  height: 50px;
  left: 500px;
  margin-top: 10px;
`

const Header: React.FC<HeaderProps> = ({ HeaderName }) => {
  return (
    <StyledNavbar>
      <div></div>
      <StyledLink to="/">
        <StyledH2>{HeaderName}</StyledH2>
        <StyledTransparent>JEJU BLACK PORK</StyledTransparent>
      </StyledLink>
      <Link to="/cart">
        <StyledImg src="img/장바구니.png" alt="장바구니" />
      </Link>
    </StyledNavbar>
  )
}

export default Header
