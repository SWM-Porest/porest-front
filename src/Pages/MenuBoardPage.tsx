import FloatingButton from 'Component/FloatingButton'
import Footer from 'Component/Footer'
import MainOrder from 'Component/MenuBoardComponent/MainOrder'
import SliderContainer from 'Component/MenuBoardComponent/SliderContainer'
import {
  getRestaurant,
  restaurantContextDefaultValue,
  useRestaurantDispatch,
  useRestaurantState,
} from 'Context/restaurantContext'
import getImageSrc from 'Utils/getImageSrc'
import { Spin } from 'antd'
import { ReactComponent as Chevron } from 'assets/Chevron.svg'
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import ErrorPage from './ErrorPage'

import { useNavigate } from 'react-router-dom'

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
  }, [dispatch, id])

  if (loading) {
    return (
      <StyledSpin tip="Loading" size="large">
        <div className="content" />
      </StyledSpin>
    )
  }
  if (error) return <ErrorPage errorCode={500} />

  return (
    <div className="MenuBoard">
      <SliderContainer
        images={
          restaurant && restaurant.banner_images
            ? restaurant.banner_images.map((banner_image) => {
                return getImageSrc(banner_image)
              })
            : []
        }
        title={restaurant ? restaurant.name : ''}
        lefticon={
          <IconLeft onClick={handleIconLeftClick}>
            <Chevron width="2rem" height="2rem" fill="#212121" />
          </IconLeft>
        }
      />

      <StyledContainer>
        <MainOrder info={restaurant ? restaurant : restaurantContextDefaultValue} />
        <FloatingButton info={restaurant ? restaurant : restaurantContextDefaultValue} />
      </StyledContainer>
      <Footer />
    </div>
  )
}

export default MenuBoardPage

const StyledContainer = styled.div`
  background-color: ${({ theme }) => theme.COLOR.common.gray[120]};
`

export const StyledSpin = styled(Spin)`
  &&& {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) scale(4);
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
