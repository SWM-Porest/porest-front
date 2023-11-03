import { LoadingOutlined } from '@ant-design/icons'
import { useAccessToken } from 'Api/tokenCookie'
import useUserData from 'Api/useUserData'
import ProfileBox from 'Component/MyPageComponent/ProfileBox'
import SelectionList from 'Component/MyPageComponent/SelectionList'
import Navbar from 'Utils/Navbar'
import { ReactComponent as Meal } from 'assets/Meal.svg'

import {
  AlertUrgent20Filled,
  ChevronDown20Filled,
  ChevronRight20Filled,
  Home20Filled,
  Home24Filled,
  Person24Filled,
  Settings20Filled,
  TextBulletListSquare20Filled,
} from '@fluentui/react-icons'
import { Restaurant } from 'Context/restaurantContext'
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

  const [subMenuVisible, setSubMenuVisible] = useState<Record<string, boolean>>({}) // 각 레스토랑에 대한 서브 메뉴 표시 여부를 저장

  const handleRestaurantClick = (restaurant: Restaurant) => {
    // 서브 메뉴 표시 여부를 토글
    setSubMenuVisible((prevState) => ({
      ...prevState,
      [restaurant._id]: !prevState[restaurant._id],
    }))
  }

  let filteredRestaurants = []

  const handleListClick = () => {
    navigate('/orderlist')
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
    <RestaurantContainer>
      <InfoContainer>
        <ProfileBox />
        <SelectionList
          Icon={<TextBulletListSquare20Filled color="#212121" />}
          Name="주문 내역"
          onClick={handleListClick}
        />

        {filteredRestaurants.length > 0 &&
          filteredRestaurants.map((restaurant) => (
            <div key={restaurant._id}>
              <SelectionList
                Icon={<Settings20Filled color="#212121" />}
                Name={`${restaurant.name} 관리`}
                onClick={() => handleRestaurantClick(restaurant)}
                RightIcon={
                  subMenuVisible[restaurant._id] ? (
                    <ChevronDown20Filled color="#AAAAA" />
                  ) : (
                    <ChevronRight20Filled color="#AAAAA" />
                  )
                }
              />
              {subMenuVisible[restaurant._id] && (
                <SubMenuContainer>
                  <SelectionList
                    Icon={<Home20Filled color="#212121" />}
                    Name={`${restaurant.name} 매장 관리`}
                    onClick={() => navigate(`/restaurants/${restaurant._id}/edit`)}
                  />
                  <SelectionList
                    Icon={<Meal width="2rem" height="2rem" fill="#212121" />}
                    Name={`${restaurant.name} 메뉴 관리`}
                    onClick={() => navigate(`/restaurants/${restaurant._id}/menus/manage`)}
                  />
                  <SelectionList
                    Icon={<AlertUrgent20Filled color="#212121" />}
                    Name={`${restaurant.name} 주문 관리`}
                    onClick={() => navigate(`/restaurants/${restaurant._id}/orders`)}
                  />
                  <SelectionList
                    Icon={<TextBulletListSquare20Filled color="#212121" />}
                    Name={`${restaurant.name} 웨이팅 관리`}
                    onClick={() => navigate(`/restaurants/${restaurant._id}/waitings/edit`)}
                  />
                </SubMenuContainer>
              )}
            </div>
          ))}
      </InfoContainer>
      <NavContainer>
        <Navbar
          Icon={{
            홈: <Home24Filled color="#BBBBBB" />,
            '': <></>,
            마이: <Person24Filled color="#3FBA73" />,
          }}
          index={2}
        />
      </NavContainer>
    </RestaurantContainer>
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

const SubMenuContainer = styled.div`
  background-color: ${({ theme }) => theme.COLOR.common.gray[120]};
`

const RestaurantContainer = styled.div`
  background-color: ${({ theme }) => theme.COLOR.common.white[0]};
  border-bottom: 1px solid ${({ theme }) => theme.COLOR.common.gray[110]};
`

const InfoContainer = styled.div`
  max-height: calc(100vh - 6rem - 6rem);
  overflow-y: auto;
`
