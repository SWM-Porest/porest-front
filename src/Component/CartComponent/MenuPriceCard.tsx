import { Menu } from 'model/restaurant'
import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
interface OwnProps {
  info: Menu
}

const StyledImage = styled.img`
  width: 20%;
`
const MenuCardLink = styled(Link)`
  display: flex;
  align-items: center;
  margin: 25px;
  border-radius: 25px;
  width: 90%;
  cursor: pointer;
  color: inherit;
  text-decoration: none;
  &:hover {
    transform: translateY(-4px);
    transition: 1s;
  }
`
const StyledContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 90%;
  margin: 15px 45px 15px 30px;
`
const StyledName = styled.p`
  margin: 5px;
  font-size: 40px;
`
const StyledPrice = styled.p`
  margin: 5px;
  font-size: 30px;
  color: #ff9100;
  font-weight: bold;
`

const MenuPriceCard: React.FC<OwnProps> = ({ info }) => {
  return (
    <MenuCardLink to={'/menu'}>
      <StyledImage src={info.img} alt="메뉴 이미지" />
      <StyledContainer>
        <StyledName>{info.name}</StyledName>
        <StyledPrice>{info.price}원</StyledPrice>
      </StyledContainer>
    </MenuCardLink>
  )
}
export default MenuPriceCard
