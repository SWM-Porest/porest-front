import Header from 'Component/Header'
import BurgerMenu from 'Component/Modal/BurgerMenu'
import RestaurantOrderList from 'Component/RestaurantOrder/RestaurantOrderList'
import { styled } from 'styled-components'

const RestaurantOrderPage = () => {
  return (
    <>
      <Header Left={<BurgerMenu />} HeaderName="주문 알림" />
      <RestaurantOrderList />
    </>
  )
}

export default RestaurantOrderPage
