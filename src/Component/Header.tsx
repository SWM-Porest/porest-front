import { useCartModal } from 'Context/CartModalContext'
import { FlexAlignCSS } from 'Styles/common'
import styled from 'styled-components'

interface HeaderProps {
  HeaderName: string
}

const Header: React.FC<HeaderProps> = ({ HeaderName }) => {
  const { openModal } = useCartModal()
  return (
    <StyledNavbar>
      <span style={{ width: 120 }} />
      <h2 style={{ margin: 0 }}>{HeaderName}</h2>
      <StyledButton onClick={openModal}>
        <h5 style={{ margin: 0 }}>주문내역</h5>
      </StyledButton>
    </StyledNavbar>
  )
}

export default Header

const StyledNavbar = styled.nav`
  ${FlexAlignCSS};
  justify-content: space-between;
  padding: 24pt 48pt;
`
const StyledButton = styled.button`
  ${FlexAlignCSS};
  color: inherit;
  padding: 0;
  border: none;
  background: none;
`
