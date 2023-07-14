import Header from 'Component/Header'
import Store from 'Component/Store'
import { Restaurant } from 'model/restaurant'
import React, { useState } from 'react'

const data: Restaurant = {
  name: '교동짬뽕',
  category: 'western',
  address: {
    city: 'seolleung',
    detail: 'somewhere',
    zipCode: 2342345,
  },
  menu: [
    { name: 'rose pasta', price: 2000, category: 'PASTA' },
    { name: 'garlic steak', price: 3000, category: 'PASTA' },
    { name: 'garlic steak', price: 5000, category: 'PASTA' },
  ],
}

const MenuBoardPage: React.FC = () => {
  const [myRestaurant, setMyRestaurant] = useState<Restaurant>(data)

  return (
    <div className="MenuBoard">
      <Header restaurantName={myRestaurant.name} />
      <h1>MenuBoardPage</h1>
      <Store info={myRestaurant} />
      <footer />
    </div>
  )
}

export default MenuBoardPage
