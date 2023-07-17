import { Menu } from 'model/restaurant'
import React from 'react'
import styled from 'styled-components'
import IngreCard from './IngreCard'

interface OwnProps {
  info: Menu
}
const StyledContainer = styled.div`
  width: 900px;
  padding: 25px;
  font-size: 25px;
`

const Ingredients: React.FC<OwnProps> = ({ info }) => {
  return (
    <StyledContainer>
      <h2>Ingredients</h2>
      <IngreCard ingre={info.ingre[0]} />
      <IngreCard ingre={info.ingre[1]} />
      <IngreCard ingre={info.ingre[2]} />
      <IngreCard ingre={info.ingre[3]} />
    </StyledContainer>
  )
}

export default Ingredients
