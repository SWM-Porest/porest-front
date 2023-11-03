import { Button } from 'antd'
import { ReactComponent as Dismiss } from 'assets/Dismiss.svg'
import { ReactComponent as Kakao } from 'assets/kakao.svg'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

const LoginPage = () => {
  const navigate = useNavigate()

  const handleDismissClick = () => {
    navigate(-3) // 전전 페이지로 이동
  }

  return (
    <Container>
      <IconContainer>
        <Icon onClick={handleDismissClick}>
          <Dismiss width="2rem" height="2rem" />
        </Icon>
      </IconContainer>
      <ContainerTitle>
        <StyledDes>주머니 세상 속 레스토랑</StyledDes>
        <StyledName>Porest</StyledName>
      </ContainerTitle>
      <ButtonContainer>
        <LoginButton href={`${process.env.REACT_APP_API_URL}/auth/kakao`}>
          <Kakao width="2.4rem" height="2.4rem" />
          <Text>카카오로 시작하기</Text>
          <></>
        </LoginButton>
      </ButtonContainer>
    </Container>
  )
}

export default LoginPage

const Container = styled.div`
  background-image: url('/img/image 5.png');
  background-size: cover;
  width: 100%;
  height: 100vh;
`
const ContainerTitle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  height: 100%;
`

const StyledDes = styled.div`
  color: rgba(255, 255, 255, 0.8);
  text-align: center;
  font-size: 1.6rem;
  font-style: normal;
  font-weight: 500;
  line-height: 2rem;
`

const StyledName = styled.div`
  color: ${({ theme }) => theme.COLOR.common.white[0]};
  text-align: center;
  font-family: 'Ultra';
  font-size: 4.8rem;
  font-style: normal;
  font-weight: 400;
  line-height: 4.8rem;
`
const Icon = styled.div`
  display: inline-flex;
  padding: 1rem;
  align-items: flex-start;
  gap: 1rem;
  border-radius: 2rem;
  background: ${({ theme }) => theme.COLOR.common.white[0]};
  box-shadow: 0 0.2rem 1.2rem 0 rgba(0, 0, 0, 0.16);
  position: absolute;
  top: 1rem;
  left: 1.2rem;
`

const IconContainer = styled.div`
  position: relative;
`

const ButtonContainer = styled.div`
  flex-shrink: 0;
  display: inline-flex;
  padding: 1rem 2rem;
  position: absolute;
  bottom: 0;
  width: 100%;
  @media screen and (min-width: ${({ theme }) => theme.MEDIA.tablet}) {
    width: ${({ theme }) => theme.MEDIA.mobile};
  }
`
const LoginButton = styled(Button)`
  height: 5.6rem;
  flex-shrink: 0;
  font-family: Pretendard;
  font-size: 1.6rem;
  font-style: normal;
  font-weight: 700;
  line-height: 2rem;
  width: 100%;
  border-radius: 1.2rem;
  background: #fee500;
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-decoration: none;
`
const Text = styled.div`
  width: 24.2rem;
  color: rgba(0, 0, 0, 0.9);
  text-align: center;
  font-size: 1.6rem;
  font-style: normal;
  font-weight: 700;
  line-height: 2rem;
`
