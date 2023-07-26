import { theme } from 'Styles/theme'
import { styled } from 'styled-components'
interface OwnProps {
  name: string
}

const MenuHeader: React.FC<OwnProps> = ({ name }) => {
  return <StyledDiv>{name}</StyledDiv>
}
export default MenuHeader

const StyledDiv = styled.div`
  font-size: ${theme.FONT_SIZE.big};
  font-weight: bold;
  marign: 16pt;
  padding-top: 16pt;
  text-align: center;
`
