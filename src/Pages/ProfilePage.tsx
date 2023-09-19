import BurgerMenu from 'Component/BurgerMenu'
import Header from 'Component/Header'
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
