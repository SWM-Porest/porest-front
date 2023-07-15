import { Restaurant } from 'model/restaurant'
import React from 'react'
import styled from 'styled-components'
import MenuCard from './MenuCard'
import MenuType from './MenuType'
interface OwnProps {
  info: Restaurant
}
const StyledContainer = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
`
const StyledImage = styled.img`
  width: 100%;
`
const Store: React.FC<OwnProps> = ({ info }) => {
  return (
    <div>
      <p>Store</p>
      <StyledImage src="img/restaurant-img.jpg" alt="레스토랑 메인 이미지" />
      <StyledContainer>
        <MenuType />
        <MenuType />
        <MenuType />
        <MenuType />
      </StyledContainer>
      <StyledContainer>
        <MenuCard info={info.menu[0]} />
        <MenuCard info={info.menu[1]} />
        <MenuCard info={info.menu[2]} />
      </StyledContainer>
    </div>
  )
}

export default Store
