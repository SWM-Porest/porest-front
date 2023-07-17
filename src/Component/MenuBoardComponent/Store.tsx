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

const Store: React.FC<OwnProps> = ({ info }) => {
  return (
    <div>
      <MenuType />
      <StyledContainer>
        <MenuCard info={info.menu[0]} />
        <MenuCard info={info.menu[1]} />
        <MenuCard info={info.menu[2]} />
        <MenuCard info={info.menu[2]} />
      </StyledContainer>
    </div>
  )
}

export default Store
