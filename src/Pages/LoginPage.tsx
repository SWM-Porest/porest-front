import { ReactComponent as Dismiss } from 'assets/Dismiss.svg'
import { ReactComponent as Kakao } from 'assets/kakao.svg'
import styled from 'styled-components'

const LoginPage = () => {
  return (
    <Container>
      <IconContainer>
        <Icon>
          <Dismiss width="2rem" height="2rem" />
        </Icon>
      </IconContainer>
      <ContainerTitle>
        <StyledDes>주머니 세상 속 레스토랑</StyledDes>
        <StyledName>Porest</StyledName>
      </ContainerTitle>
      <ButtonContainer>
        <Button href="http://localhost:3001/auth/kakao">
          <Kakao width="2.4rem" height="2.4rem" />
          <Text>카카오로 시작하기</Text>
        </Button>
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
  align-items: center; /* 수직 정렬을 중앙에 맞춥니다. */
  justify-content: center; /* 수평 정렬을 중앙에 맞춥니다. */

  height: 100%;
`

const StyledDes = styled.div`
  color: rgba(255, 255, 255, 0.8);
  text-align: center;
  font-family: 'pretendard';
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 20px; /* 125% */
`

const StyledName = styled.div`
  color: #fff;
  text-align: center;
  font-family: 'ultra'; //폰트 찾아보기
  font-size: 48px;
  font-style: normal;
  font-weight: 400;
  line-height: 48px; /* 100% */
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
  flex-direction: column;
  align-items: flex-start;
  position: absolute;
  bottom: 0;
`
const Button = styled.a`
  width: 350px;
  height: 56px;
  flex-shrink: 0;
  border-radius: 12px;
  background: #fee500;
  text-decoration: none;
`
const Text = styled.div`
  width: 242px;
  color: rgba(0, 0, 0, 0.9);
  text-align: center;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 20px; /* 125% */
`
