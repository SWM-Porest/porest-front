import { FlexAlignCSS } from 'Styles/common'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

interface HeaderProps {
  HeaderName: string
}

const Header: React.FC<HeaderProps> = ({ HeaderName }) => {
  return (
    <StyledNavbar>
      <span style={{ width: 120 }} />
      <StyledLink to="/">
        <h2 style={{ margin: 0 }}>{HeaderName}</h2>
        <StyledTransparent>JEJU BLACK PORK</StyledTransparent>
      </StyledLink>
      <StyledLink to="/cart">
        <h5 style={{ margin: 0 }}>주문내역</h5>
      </StyledLink>
    </StyledNavbar>
  )
}

export default Header

const StyledNavbar = styled.nav`
  ${FlexAlignCSS};
  justify-content: space-between;
  padding: 24pt 48pt;
`
const StyledLink = styled(Link)`
  ${FlexAlignCSS};
  color: inherit;
  text-decoration: none;
`

const StyledTransparent = styled.p`
  color: ${({ theme }) => theme.COLOR.common.gray[300]};
  position: absolute;
  top: 56pt;
  left: 120pt;
  margin: 0;
`
