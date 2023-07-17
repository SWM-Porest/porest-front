import CartPrice from 'Component/CartComponent/CartPrice'
import Header from 'Component/Header'
import { Cart } from 'model/restaurant'
import React, { useState } from 'react'
const data: Cart = {
  menu: [
    { name: '짬뽕', price: 3000, category: 'PASTA', description: '설명', ingre: ['밀가루', '치즈', '토마토', '바질'] },
    { name: '음료', price: 5000, category: 'PASTA', description: '설명', ingre: ['재료'] },
  ],
}
const CartPage: React.FC = () => {
  const [myCart, setMyCart] = useState<Cart>(data)

  return (
    <div>
      <Header HeaderName="Cart" />
      <CartPrice cartprice={myCart} />
    </div>
  )
}

export default CartPage
