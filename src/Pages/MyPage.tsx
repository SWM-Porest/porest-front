import ProfileBox from 'Component/MyPageComponent/ProfileBox'
import SelectionList from 'Component/MyPageComponent/SelectionList'
import Navbar from 'Utils/Navbar'
import { ReactComponent as Home } from 'assets/Home.svg'
import { ReactComponent as Person } from 'assets/Person.svg'
import { ReactComponent as TextList } from 'assets/TextListSquare.svg'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

const MyPage = () => {
  const navigate = useNavigate()

  const handleListClick = () => {
    navigate('/orderlist')
  }

  const handleHomeClick = () => {
    navigate('/restaurants')
  }

  return (
    <div>
      <ProfileBox />
      <SelectionList
        Icon={<TextList width="2rem" height="2rem" fill="#212121" />}
        Name="주문 내역"
        onClick={handleListClick}
      />
      <NavContainer>
        <Navbar
          Icon={{
            홈: <Home width="2.4rem" height="2.4rem" fill="#BBBBBB" onClick={handleHomeClick} />,
            '': <></>,
            마이: <Person width="2.4rem" height="2.4rem" fill="#3FBA73" />,
          }}
          index={2}
        />
      </NavContainer>
    </div>
  )
}

export default MyPage

const NavContainer = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 60px;
  background-color: ${({ theme }) => theme.COLOR.common.white[0]};
  @media screen and (min-width: ${({ theme }) => theme.MEDIA.tablet}) {
    width: ${({ theme }) => theme.MEDIA.mobile};
  }
`
