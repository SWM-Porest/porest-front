import { Link } from 'react-router-dom'
import { styled } from 'styled-components'

const StyeldButton = styled.button`
  cursor: pointer;
  background-color: #4caf50e0;
  color: #ffffff;
  padding: 30px;
  width: 90%;
  margin: auto;
  margin-bottom: 40px;
  border-radius: 10px;
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.3);
  border: none;
`

const StyledLink = styled(Link)`
  cursor: pointer;
  font-size: 40px;
  text-align: center;
  color: inherit;
  text-decoration: none;
  margin: 0px;
  font-weight:bold;
  }
`

const AddCart = () => {
  return (
    <div style={{ display: 'flex' }}>
      <StyeldButton>
        <StyledLink to="/cart">장바구니 담기</StyledLink>
      </StyeldButton>
    </div>
  )
}

export default AddCart
