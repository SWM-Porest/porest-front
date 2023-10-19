import { ReactComponent as Person } from 'assets/Person.svg'
import { ReactComponent as Settings } from 'assets/Settings.svg'
import styled from 'styled-components'

const ProfileBox = () => {
  return (
    <Container>
      <ProfileContainer>
        <Person width="6.4rem" height="6.4rem" fill="#AAAAAA" />
        <ContentsContainer>
          <Name>이름</Name>
          <Mail>이메일</Mail>
        </ContentsContainer>
      </ProfileContainer>
      <SettingContainer>
        <Settings width="2.4rem" height="2.4rem" />
      </SettingContainer>
    </Container>
  )
}

export default ProfileBox

const Container = styled.div`
  display: flex;
  width: 100%;
  padding: 2rem;
  justify-content: space-between;
  align-items: center;
`

const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1.6rem;
`

const SettingContainer = styled.div`
  display: flex;
  padding: 1rem;
  justify-content: center;
  align-items: center;
  border-radius: 2.2rem;
  background: ${({ theme }) => theme.COLOR.common.gray[120]};
`
const ContentsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.4rem;
`
const Name = styled.div`
  color: ${({ theme }) => theme.COLOR.common.gray[20]};
  text-align: center;
  font-size: 2rem;
  font-style: normal;
  font-weight: 700;
  line-height: 2.4rem;
`

const Mail = styled.div`
  color: ${({ theme }) => theme.COLOR.common.gray[40]};
  font-size: 1.2rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1.6rem;
`
