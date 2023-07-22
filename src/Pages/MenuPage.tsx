import { useRestaurantLoading } from 'Api/useRestaurantContextValue'
import Footer from 'Component/Footer'
import Header from 'Component/Header'
import AddCart from 'Component/MenuComponent/AddCart'
import Categories from 'Component/MenuComponent/Categories'
import ContainerBox from 'Component/MenuComponent/ContainerBox'
import DescriptionContainer from 'Component/MenuComponent/DescriptionContainer'
import { RestaurantContext } from 'Context/restaurant_context'
import { useContext } from 'react'

const MenuPage: React.FC = () => {
  const {
    restaurant: { menus },
  } = useContext(RestaurantContext)

  console.log('메뉴!', menus)
  return (
    <div>
      <h1>MenuPage</h1>
      <Header HeaderName={menus[0].name} />
      <DescriptionContainer
        title={menus[0].name}
        price={menus[0].price}
        description={menus[0].description}
        img={menus[0].img}
      ></DescriptionContainer>
      {/* 메뉴 정보 및 선택 블럭 */}
      <ContainerBox>
        <Categories ingre={menus[0].ingre}></Categories>
      </ContainerBox>
      <AddCart />
      <Footer />
    </div>
  )
}

export default MenuPage
