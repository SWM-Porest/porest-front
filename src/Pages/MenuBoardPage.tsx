import { useRestaurantLoading } from 'Api/useRestaurantContextValue'
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
import { Restaurant } from 'model/restaurant'
import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'

const StyledContainer = styled.div`
  background-color: #fff;
`
const data: Restaurant = {
  name: '흑다돈',
  category: 'western',
  address: {
    city: 'seolleung',
    detail: 'somewhere',
    zipCode: 2342345,
  },
  menus: [
    {
      name: '짜장',
      menutype: '요리류',
      price: 2000,
      category: 'PASTA',
      description:
        '양파, 양배추 등 채소와 돼지고기에 기름으로 튀긴 춘장을 넣어 굵은 국수에 비벼서 먹는 한국식 중국 요리로, 짬뽕, 우동하고 더불어 트로이카 메뉴',
      img: 'img/짜장.png',
      ingre: ['밀가루', '치즈', '토마토', '바질'],
    },
    {
      name: '짬뽕',
      menutype: '요리류',
      price: 3000,
      category: 'PASTA',
      description: '설명',
      img: 'img/짬뽕.webp',
      ingre: ['밀가루', '치즈', '토마토', '바질'],
    },
    {
      name: '음료',
      menutype: '주류',
      price: 5000,
      category: 'PASTA',
      description: '설명',
      img: '',
      ingre: ['재료'],
    },
  ],
}

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
  const id = '64bb91af02ebdee472579f97'
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
        <Header HeaderName={restaurant ? restaurant.name : 'noname'} />
        <StyledBanner images={images} />
        <StyledOrder info={restaurant ? restaurant : restaurantContextDefaultValue} />
      </StyledContainer>
      <Footer />
    </div>
  )
}

export default MenuBoardPage
