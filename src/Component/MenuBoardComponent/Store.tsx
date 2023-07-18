import { Menu, Restaurant } from 'model/restaurant'
import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import MenuType from './MenuType'
const menutype = ['요리류', '식사류', '주류', '세트메뉴']

interface OwnProps {
  info: Restaurant
}
interface Props {
  info: Menu
}

const StyledImage = styled.img`
  width: 20%;
  padding: 20px;
`
const StyledContainer = styled.div`
  width: 100%;
  padding: 10px;
`
const StyledH2 = styled.h2`
  margin: 0px;
  padding: 30px 0 15px 40px;
  width: 100%;
  font-size: xx-large;
  border-radius: 25px 25px 0 0;
  background-color: lightgray;
`
const MenuCardContainer = styled(Link)`
  display: flex;
  align-items: center;
  margin: 25px;
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
const MenuCardsContainer = styled.div`
  align-items: center;
  margin: 0 10px 0 10px;
`
const StyledName = styled.p`
  padding-left: 20px;
  margin: 5px;
  font-size: 40px;
`
const StyledPrice = styled.p`
  padding-left: 20px;
  margin: 5px;
  font-size: 30px;
  color: #ff9100;
`

const Store: React.FC<OwnProps> = ({ info }) => {
  return (
    <StyledContainer>
      <MenuType />
      <MenuCardsContainer>
        <StyledH2>{info.menu[0].menutype}</StyledH2>
        <MenuCard info={info.menu[0]} />
        <MenuCard info={info.menu[1]} />
      </MenuCardsContainer>
      <MenuCardsContainer>
        <StyledH2>{info.menu[2].menutype}</StyledH2>
        <MenuCard info={info.menu[2]} />
        <MenuCard info={info.menu[2]} />
      </MenuCardsContainer>
    </StyledContainer>
  )
}

export default Store

const MenuCard: React.FC<Props> = ({ info }) => {
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
