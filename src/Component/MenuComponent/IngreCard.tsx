import React from 'react'
import styled from 'styled-components'
interface OwnProps {
  ingre: string
}
const StyledContainer = styled.div`
  text-align: center;
  padding: 20px;
  margin: 10px;
  background-color: lightgray;
  font-size: 15px;
`

const IngreCard: React.FC<OwnProps> = ({ ingre }) => {
  return (
    <StyledContainer>
      <div>{ingre}</div>
    </StyledContainer>
  )
}
export default IngreCard
