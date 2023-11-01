import { LoadingOutlined } from '@ant-design/icons'
import Navbar from 'Utils/Navbar'
import getImageSrc from 'Utils/getImageSrc'
import { ReactComponent as Home } from 'assets/Home.svg'
import { ReactComponent as Person } from 'assets/Person.svg'
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
    <div>
      <RestaurantList>
        {restaurants.map((restaurant) => (
          <div key={restaurant._id}>
            <RestaurantLink to={`/restaurants/${restaurant._id}`}>
              <StyledImage src={getImageSrc(restaurant.banner_images[0])} alt="매장 사진" />
              <ContentsContainer>
                <NameContainer>
                  <StyledName>{restaurant.name}</StyledName>
                </NameContainer>
                <AddressContainer>
                  <StyledAddress>주소: {restaurant.address}</StyledAddress>
                </AddressContainer>
                <InfoContainer>
                  <StyledInfo>설명: {restaurant.intro}</StyledInfo>
                </InfoContainer>
              </ContentsContainer>
            </RestaurantLink>
          </div>
        ))}
      </RestaurantList>
      <NavContainer>
        <Navbar
          Icon={{
            홈: <Home width="2.4rem" height="2.4rem" fill="#3FBA73" />,
            '': <></>,
            마이: <Person width="2.4rem" height="2.4rem" fill="#BBBBBB" />,
          }}
          index={0}
        />
      </NavContainer>
    </div>
  )
}
export default RestaurantListPage

const RestaurantList = styled.ul`
  display: inline-flex;
  flex-direction: column;
  align-items: flex;
  gap: 1.6rem;
  padding: 0 2rem;
  width: 100%;
  overflow-y: auto;
  max-height: calc(100vh - 6rem - 6rem);
`

const StyledImage = styled.img`
  width: 100%;
  height: 20rem;
  flex-shrink: 0;
  border-radius: 1.2rem 1.2rem 0 0;
`

const RestaurantLink = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.2rem;
  text-decoration: none;
`

const ContentsContainer = styled.div`
  padding: 1.2rem 1.6rem;
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.8rem;
`

const NameContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.4rem;
  align-self: stretch;
`

const StyledName = styled.div`
  color: ${({ theme }) => theme.COLOR.common.gray[20]};
  font-size: 1.8rem;
  font-style: normal;
  font-weight: 700;
`

const AddressContainer = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.4rem;
`

const StyledAddress = styled.div`
  color: ${({ theme }) => theme.COLOR.common.gray[30]};
  font-size: 1.2rem;
  font-style: normal;
  font-weight: 400;
`

const InfoContainer = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.4rem;
`
const StyledInfo = styled.div`
  color: ${({ theme }) => theme.COLOR.common.gray[30]};
  font-size: 1.2rem;
  font-style: normal;
  font-weight: 400;
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
const NavContainer = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 6rem;
  background-color: ${({ theme }) => theme.COLOR.common.white[0]};
  @media screen and (min-width: ${({ theme }) => theme.MEDIA.tablet}) {
    width: ${({ theme }) => theme.MEDIA.mobile};
  }
`
