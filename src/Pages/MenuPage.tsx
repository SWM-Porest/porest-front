import Footer from 'Component/Footer'
import Header from 'Component/Header'
import AddCart from 'Component/MenuComponent/AddCart'
import Categories from 'Component/MenuComponent/Categories'
import ContainerBox from 'Component/MenuComponent/ContainerBox'
import DescriptionContainer from 'Component/MenuComponent/DescriptionContainer'
import MenuHeader from 'Component/MenuComponent/MenuHeader'
import { MenuModal } from 'Component/MenuComponent/MenuModal'
import { useRestauranDispatch, useRestaurantState } from 'Context/restaurantContext'

const MenuPage: React.FC = () => {
  const state = useRestaurantState()

  const { data: restaurant, loading, error } = state.restaurant

  if (loading) return <div>로딩중...</div>
  if (error) return <div>에러가 발생했습니다.</div>
  if (!restaurant) return null
  return (
    <div>
      {/* 모달 창 */}
      <ContainerBox>
        <MenuModal>
          <MenuHeader name={restaurant?.name} />
          <DescriptionContainer
            title={restaurant?.menus[0].name}
            price={restaurant?.menus[0].price}
            description={restaurant?.menus[0].description}
            img={restaurant?.menus[0].img[0]}
          ></DescriptionContainer>
          <ContainerBox>
            <Categories ingre={restaurant?.menus[0].ingre}></Categories>
          </ContainerBox>
          <AddCart />
        </MenuModal>
      </ContainerBox>

      <Footer />
    </div>
  )
}

export default MenuPage
