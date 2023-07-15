import { Menu } from 'model/restaurant'
import React from 'react'
import styled from 'styled-components'
interface OwnProps {
  info: Menu
}
const StyledContainer = styled.div`
  text-align: center;
  padding: 20px;
`
const MenuCard: React.FC<OwnProps> = ({ info }) => {
  return (
    <StyledContainer>
      <div>{info.name}</div>
      <div>{info.price}</div>
    </StyledContainer>
  )
}
export default MenuCard
