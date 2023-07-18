import Footer from 'Component/Footer'
import Header from 'Component/Header'
import Ingredients from 'Component/MenuComponent/Ingredients'
import SelectSpicy from 'Component/MenuComponent/SelectSpicy'
import SpecialInstructions from 'Component/MenuComponent/SpecialInstructions'
import { Restaurant } from 'model/restaurant'
import React, { useState } from 'react'
import styled from 'styled-components'

const data: Restaurant = {
  name: '교동짬뽕',
  category: 'western',
  address: {
    city: 'seolleung',
    detail: 'somewhere',
    zipCode: 2342345,
  },
  menu: [
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
      img: 'img/환타.jpg',
      ingre: ['재료'],
    },
  ],
}

const StyledImage = styled.img`
  width: 900px;
  padding: 25px;
`
const DescriptionContainer = styled.div`
  width: 900px;
  padding: 25px;
  font-size: 25px;
`

const MenuPage: React.FC = () => {
  const [myRestaurant, setMyRestaurant] = useState<Restaurant>(data)
  const handleSpicyLevelSelected = (level: number) => {
    // 선택된 spicy level을 처리하는 로직을 작성합니다.
    console.log('Selected spicy level:', level)
  }
  const handleFormSubmit = (request: string) => {
    console.log('요청사항:', request)
  }
  return (
    <div>
      <h1>MenuPage</h1>
      <Header HeaderName={myRestaurant.menu[0].name} />
      <StyledImage src="img/짜장.png" alt="짜장 이미지" />
      <DescriptionContainer>
        <h2>description </h2>
        {myRestaurant.menu[0].description}
      </DescriptionContainer>
      <SelectSpicy hasSpicyLevel={true} onSpicyLevelSelected={handleSpicyLevelSelected} />
      <Ingredients info={myRestaurant.menu[0]} />
      <SpecialInstructions onSubmit={handleFormSubmit} />
      <Footer />
    </div>
  )
}

export default MenuPage
