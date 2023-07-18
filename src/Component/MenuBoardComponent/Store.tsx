import { Restaurant } from 'model/restaurant'
import React from 'react'
import styled from 'styled-components'
import MenuCard from './MenuCard'
import MenuType from './MenuType'
const menutype = ['요리류', '식사류', '주류', '세트메뉴']
interface OwnProps {
  info: Restaurant
}

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

const MenuCardsContainer = styled.div`
  align-items: center;
  margin: 0 10px 0 10px;
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
