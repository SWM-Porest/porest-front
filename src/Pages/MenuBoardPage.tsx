import { ChevronLeft20Filled, Home24Filled, Person24Filled } from '@fluentui/react-icons'
import FloatingButton from 'Component/FloatingButton'
import Footer from 'Component/Footer'
import Loading from 'Component/Loading'
import MainOrder from 'Component/MenuBoardComponent/MainOrder'
import SliderContainer from 'Component/MenuBoardComponent/SliderContainer'
import {
  getRestaurant,
  restaurantContextDefaultValue,
  useRestaurantDispatch,
  useRestaurantState,
} from 'Context/restaurantContext'
import Navbar from 'Utils/Navbar'
import getImageSrc from 'Utils/getImageSrc'
import { Spin } from 'antd'
import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import styled from 'styled-components'
import ErrorPage from './ErrorPage'

const MenuBoardPage: React.FC = () => {
  const { id } = useParams()
  if (id === undefined) throw new Error('id가 없습니다.')

  const dispatch = useRestaurantDispatch()
  const { data: restaurant, loading, error } = useRestaurantState().restaurant
  const navigate = useNavigate()

  const handleIconLeftClick = () => {
    navigate('/restaurants')
  }
  useEffect(() => {
    getRestaurant(dispatch, id)
    // 열었을 때 영업중 아니라고 뜨는 오류 있음;;
    if (restaurant && restaurant.status != 1) {
      alert('영업중인 레스토랑이 아닙니다.')
      navigate(-1)
    }
  }, [dispatch, id])

  if (loading) {
    return <Loading />
  }
  if (error) return <ErrorPage errorCode={500} />

  return (
    <div className="MenuBoard">
      <Container>
        <SliderContainer
          images={
            restaurant && restaurant.banner_images
              ? restaurant.banner_images.map((banner_image) => {
                  return getImageSrc(banner_image)
                })
              : []
          }
          title={restaurant ? restaurant.name : ''}
          intro={restaurant ? restaurant.intro : ''}
          lefticon={
            <IconLeft onClick={handleIconLeftClick}>
              <ChevronLeft20Filled color="#212121" />
            </IconLeft>
          }
        />

        <StyledContainer>
          <MainOrder info={restaurant ? restaurant : restaurantContextDefaultValue} />
          <FloatingButton info={restaurant ? restaurant : restaurantContextDefaultValue} />
        </StyledContainer>
        <Footer />
      </Container>
      <NavContainer>
        <Navbar
          Icon={{
            홈: <Home24Filled color="#BBBBBB" />,
            '': <></>,
            마이: <Person24Filled color="#BBBBBB" />,
          }}
          index={1}
        />
      </NavContainer>
    </div>
  )
}

export default MenuBoardPage

const Container = styled.div`
  max-height: calc(100vh - 6rem);
  overflow-y: auto;
`
const StyledContainer = styled.div`
  background-color: ${({ theme }) => theme.COLOR.common.gray[120]};
`

export const StyledSpin = styled(Spin)`
  &&& {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) scale(2);
  }
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
  cursor: pointer;
`

const IconLeft = styled(Icon)`
  left: 1.2rem;
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
