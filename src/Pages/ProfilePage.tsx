import Header from 'Component/Header'
import BurgerMenu from 'Component/Modal/BurgerMenu'
import OrderList from 'Component/ProfileComponent/OrderList'
const ProfilePage = () => {
  return (
    <div>
      <Header Left={<BurgerMenu />} HeaderName={'마이페이지'} />
      <OrderList />
    </div>
  )
}

export default ProfilePage
