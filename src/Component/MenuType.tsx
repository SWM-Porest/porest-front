import React from 'react'
import styled from 'styled-components'

const StyledContainer = styled.div`
  padding: 20px;
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
