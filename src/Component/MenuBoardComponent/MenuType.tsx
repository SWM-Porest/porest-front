import React from 'react'
import styled from 'styled-components'

const StyledContainer = styled.div`
  padding: 30px;
  margin: 10px;
  background-color: lightgray;
  font-size: 30px;
`

const MenuType: React.FC = () => {
  return (
    <StyledContainer>
      <div>Typeimage</div>
      <div>
        <p>식사류</p>
      </div>
    </StyledContainer>
  )
}

export default MenuType
