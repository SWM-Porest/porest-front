import Footer from 'Component/Footer'
import Header from 'Component/Header'
import MainBanner from 'Component/MenuBoardComponent/MainBanner'
import MainOrder from 'Component/MenuBoardComponent/MainOrder'
import {
  getRestaurant,
  restaurantContextDefaultValue,
  useRestauranDispatch,
  useRestaurantState,
} from 'Context/restaurantContext'
import React, { useEffect } from 'react'
import styled from 'styled-components'

const StyledContainer = styled.div`
  background-color: #fff;
`

const StyledBanner = styled(MainBanner)`
  margin: 0px;
  padding: 0px;
`
const StyledOrder = styled(MainOrder)`
  margin: 0px;
  padding: 0px;
`
const MenuBoardPage: React.FC = () => {
  const images = ['img/교동짬뽕.jpeg', 'img/메뉴판.jpeg', 'img/내부.jpeg']
  const id = '64be5622cdbb9385ac6851b9'
  const state = useRestaurantState()
  const dispatch = useRestauranDispatch()

  const { data: restaurant, loading, error } = state.restaurant
  useEffect(() => {
    getRestaurant(dispatch, id)
  }, [dispatch, id])

  if (loading) return <div>로딩중...</div>
  if (error) return <div>에러가 발생했습니다.</div>
  return (
    <div className="MenuBoard">
      <StyledContainer>
        <Header HeaderName={restaurant ? restaurant.name : ''} />
        <StyledBanner images={images} />
        <StyledOrder info={restaurant ? restaurant : restaurantContextDefaultValue} />
      </StyledContainer>
      <Footer />
    </div>
  )
}

export default MenuBoardPage
