import { Link } from 'react-router-dom'
import styled from 'styled-components'
const StyledContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  background-color: #f2f2f2;
  border-radius: 10px;
  width: 90%;
`
const ParentContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`
const StyledLink = styled(Link)`
  cursor: pointer;
  font-size: 40px;
  text-align: center;
  color: inherit;
  text-decoration: none;
  margin: 0px;
  padding: 10px;

  &:hover {
    transform: translateY(-4px);
    transition: 1s;
  }
`
const Footer: React.FC = () => {
  return (
    <ParentContainer>
      <StyledContainer>
        <StyledLink to="/cart">장바구니 담기</StyledLink>
      </StyledContainer>
    </ParentContainer>
  )
}

export default Footer
