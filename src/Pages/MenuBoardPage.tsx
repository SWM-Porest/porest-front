import Footer from 'Component/Footer'
import Header from 'Component/Header'
import Store from 'Component/MenuBoardComponent/Store'
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
      price: 2000,
      category: 'PASTA',
      description:
        '양파, 양배추 등 채소와 돼지고기에 기름으로 튀긴 춘장을 넣어 굵은 국수에 비벼서 먹는 한국식 중국 요리로, 짬뽕, 우동하고 더불어 트로이카 메뉴',
      ingre: ['밀가루', '치즈', '토마토', '바질'],
    },
    { name: '짬뽕', price: 3000, category: 'PASTA', description: '설명', ingre: ['밀가루', '치즈', '토마토', '바질'] },
    { name: '음료', price: 5000, category: 'PASTA', description: '설명', ingre: ['재료'] },
  ],
}

const StyledImage = styled.img`
  width: 900px;
  padding: 25px;
`

const MenuBoardPage: React.FC = () => {
  const [myRestaurant, setMyRestaurant] = useState<Restaurant>(data)

  return (
    <div className="MenuBoard">
      <Header HeaderName={myRestaurant.name} />
      <StyledImage src="img/restaurant-img.jpg" alt="레스토랑 메인 이미지" />
      <Store info={myRestaurant} />
      <Footer />
    </div>
  )
}

export default MenuBoardPage
