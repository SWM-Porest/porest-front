import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Footer: React.FC = () => {
  return (
    <ParentContainer>
      <StyledContainer>
        <StyledLink to="/cart">장바구니 담기</StyledLink>
        <Copyright>© 2023 porest</Copyright>
        <BottomSpacing />
      </StyledContainer>
    </ParentContainer>
  )
}

export default Footer

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #f2f2f2;
  width: 100%;
`
const ParentContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Noto Sans KR', sans-serif;
  width: 100%;
`
const StyledLink = styled(Link)`
  cursor: pointer;
  font-size: 40px;
  text-align: center;
  color: inherit;
  text-decoration: none;
  margin: 0px;
`

const Copyright = styled.p`
  font-size: 24px;
  color: #777;
  margin-top: 10px;
  text-align: center;
`

const BottomSpacing = styled.div`
  height: 32px; /* Adjust the height as needed for the desired spacing */
`
