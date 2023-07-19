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
const MenuCardContainer = styled(Link)`
  display: flex;
  align-items: center;
  border-radius: 25px;
  width: 100%;
  cursor: pointer;
  color: inherit;
  text-decoration: none;
  &:hover {
    transform: translateY(-4px);
    transition: 1s;
  }
`
const StyledName = styled.p`
  margin: 5px;
  font-size: 40px;
`
const StyledPrice = styled.p`
  margin: 5px;
  font-size: 30px;
  color: #ff9100;
`

const MenuCard: React.FC<OwnProps> = ({ info }) => {
  return (
    <MenuCardContainer to={'/menu'}>
      <StyledImage src={info.img} alt="메뉴 이미지" />
      <div>
        <StyledName>{info.name}</StyledName>
        <StyledPrice>{info.price}원</StyledPrice>
      </div>
    </MenuCardContainer>
  )
}
export default MenuCard
