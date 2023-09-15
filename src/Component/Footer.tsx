import styled from 'styled-components'

const Footer: React.FC = () => {
  return (
    <ParentContainer>
      <StyledContainer>
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
  background-color: ${({ theme }) => theme.COLOR.common.gray[700]};
  width: 100%;
`
const ParentContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Noto Sans KR', sans-serif;
  width: 100%;
  cursor: default;
`

const Copyright = styled.p`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.COLOR.common.gray[400]};
  margin-top: 8pt;
  text-align: center;
`

const BottomSpacing = styled.div`
  height: 32pt;
`
