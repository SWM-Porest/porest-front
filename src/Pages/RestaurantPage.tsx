import Header from 'Component/Header'
import BurgerMenu from 'Component/Modal/BurgerMenu'
import { useRestaurantState } from 'Context/restaurantContext'

const RestaurantPage = () => {
  const { data: restaurant } = useRestaurantState().restaurant

  return (
    <div>
      <Header Left={<BurgerMenu />} HeaderName={restaurant ? restaurant.name : ''} />
      레스토랑 안내 페이지
    </div>
  )
}

export default RestaurantPage
