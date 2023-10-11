import { LoadingOutlined } from '@ant-design/icons'
import Header from 'Component/Header'
import BurgerMenu from 'Component/Modal/BurgerMenu'
import getImageSrc from 'Utils/getImageSrc'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const RestaurantListPage = () => {
  const [restaurants, setRestaurants] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

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

  return (
    <>
      <Header Left={<BurgerMenu />} HeaderName="레스토랑" />
      <div>
        <RestaurantList>
          {restaurants.map((restaurant) => (
            <RestaurantItem key={restaurant._id}>
              <RestaurantLink to={`/restaurants/${restaurant._id}`}>
                <Container>
                  <StyledImage src={getImageSrc(restaurant.banner_images[0])} alt="매장 사진" />
                  <div>
                    <StyledName>{restaurant.name}</StyledName>
                    <StyledAddress>주소: {restaurant.address}</StyledAddress>
                    <StyledInfo>설명: {restaurant.intro}</StyledInfo>
                  </div>
                </Container>
              </RestaurantLink>
            </RestaurantItem>
          ))}
        </RestaurantList>
      </div>
    </>
  )
}
export default RestaurantListPage

const RestaurantList = styled.ul`
  list-style: none;
  padding: 0;
  padding: 8pt 48pt;
`

const RestaurantItem = styled.li`
  margin-bottom: 16pt;
  display: flex;
  border: 1px solid #e0e0e0;
  border-radius: 8pt;
  padding: 16pt;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`

const RestaurantLink = styled(Link)`
  text-decoration: none;
  color: ${({ theme }) => theme.COLOR.common.black};
`

const Container = styled.div`
  display: flex;
  align-items: center;
`

const StyledImage = styled.img`
  width: 200pt;
  height: 192pt;
  border-radius: 8pt;
`

const StyledInfo = styled.p`
  padding: 8pt 56pt;
  margin: 0;
  text-align: left;
`

const StyledName = styled.h4`
  padding: 8pt 56pt;
  margin: 0;
  text-align: left;
`

const StyledAddress = styled.h5`
  padding: 8pt 56pt;
  margin: 0;
  text-align: left;
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
