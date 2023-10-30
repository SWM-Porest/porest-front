import { LoadingOutlined } from '@ant-design/icons'
import { useAccessToken } from 'Api/tokenCookie'
import useUserData from 'Api/useUserData'
import ProfileBox from 'Component/MyPageComponent/ProfileBox'
import SelectionList from 'Component/MyPageComponent/SelectionList'
import Navbar from 'Utils/Navbar'
import { ReactComponent as Home } from 'assets/Home.svg'
import { ReactComponent as Person } from 'assets/Person.svg'
import { ReactComponent as Settings } from 'assets/Settings.svg'
import { ReactComponent as TextList } from 'assets/TextListSquare.svg'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

const MyPage = () => {
  const [restaurants, setRestaurants] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [accessToken, setAccessToken] = useAccessToken()
  const { data: userData } = useUserData(accessToken)
  const navigate = useNavigate()
  let filteredRestaurants = []

  const handleListClick = () => {
    navigate('/orderlist')
  }

  const handleHomeClick = () => {
    navigate('/restaurants')
  }

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/restaurants`)
      .then((response) => {
        setRestaurants(response.data)
        setLoading(false)
      })
      .catch((err) => {
        setError(err)
        setLoading(false)
      })
  }, [])

  if (loading) {
    return (
      <LoadingContainer>
        <LoadingIcon spin />
        로딩 중...
      </LoadingContainer>
    )
  }
  console.log(userData)
  console.log(restaurants)
  if (error || restaurants.length === 0) {
    return (
      <Container>
        <NoDataMessage>레스토랑 목록을 불러올 수 없습니다.</NoDataMessage>
      </Container>
    )
  }
  if (userData && userData.restaurants_id) {
    filteredRestaurants = restaurants.filter((restaurant) => userData.restaurants_id.includes(restaurant._id))
  }

  return (
    <div>
      <ProfileBox />
      <SelectionList
        Icon={<TextList width="2rem" height="2rem" fill="#212121" />}
        Name="주문 내역"
        onClick={handleListClick}
      />
      {filteredRestaurants.length > 0 &&
        filteredRestaurants.map((restaurant) => (
          <div key={restaurant._id}>
            <SelectionList
              Icon={<Settings width="2rem" height="2rem" fill="#212121" />}
              Name={`${restaurant.name} 관리`}
              onClick={() => navigate(`/restaurants/${restaurant._id}/edit`)}
            />
            <SelectionList
              Icon={<Settings width="2rem" height="2rem" fill="#212121" />}
              Name={`${restaurant.name} 메뉴 관리`}
              onClick={() => navigate(`/restaurants/${restaurant._id}/menus/manage`)}
            />
          </div>
        ))}
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

const Container = styled.div`
  display: flex;
  align-items: center;
`

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`

const LoadingIcon = styled(LoadingOutlined)`
  font-size: 2rem;
  margin-right: 8pt;
`

const NoDataMessage = styled.div`
  text-align: center;
  margin-top: 16pt;
  font-size: 1.2rem;
`
