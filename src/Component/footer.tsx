import { Link } from 'react-router-dom'
import styled from 'styled-components'
const StyledContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100px;
  background-color: #f2f2f2;
  width: 100%;
`
const StyledLink = styled(Link)`
  cursor: pointer;
  font-size: 50px;
  text-align: center;
  color: inherit;
  text-decoration: none;
  &:hover {
    transform: translateY(-2px);
    transition: 1s;
  }
`
const Footer: React.FC = () => {
  return (
    <StyledContainer>
      <StyledLink to="/cart">장바구니 담기</StyledLink>
    </StyledContainer>
  )
}

export default Footer
