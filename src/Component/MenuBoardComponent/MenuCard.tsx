import { Menu } from 'model/restaurant'
import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
interface OwnProps {
  info: Menu
}

const StyledImage = styled.img`
  width: 50%;
  padding: 15px 50px 15px 15px;
`
const MenuCardContainer = styled(Link)`
  display: flex;
  align-items: center;
  border-radius: 25px;
  color: inherit;
  text-decoration: none;
`
const StyledName = styled.p`
  margin: 5px;
  font-size: 50px;
  &:hover {
    transform: translateY(-4px);
    transition: 1s;
  }
`
const StyledPrice = styled.p`
  margin: 5px;
  font-size: 40px;
  font-family: 'Noto Serif KR', serif;
  color: #ff9100;
  &:hover {
    transform: translateY(-4px);
    transition: 1s;
  }
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
