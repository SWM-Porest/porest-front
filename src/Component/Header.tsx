import { useCartModal } from 'Context/CartModalContext'
import { FlexAlignCSS } from 'Styles/common'
import styled from 'styled-components'

interface HeaderProps {
  Left: React.ReactNode | undefined
  HeaderName: string
  Right: React.ReactNode | undefined
}

const Header: React.FC<HeaderProps> = ({ Left, HeaderName, Right }) => {
  const { openModal } = useCartModal()
  return (
    <StyledNavbar>
      {Left && <span style={{ width: 120 }} />}
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
