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
import { Spin } from 'antd'
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import ErrorPage from './ErrorPage'

const MenuBoardPage: React.FC = () => {
  const { id } = useParams()
  if (id === undefined) throw new Error('id가 없습니다.')

  const dispatch = useRestaurantDispatch()
  const { data: restaurant, loading, error } = useRestaurantState().restaurant

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
      <SliderContainer />
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
