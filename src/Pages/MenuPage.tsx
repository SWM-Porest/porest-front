import Footer from 'Component/Footer'
import Header from 'Component/Header'
import AddCart from 'Component/MenuComponent/AddCart'
import Categories from 'Component/MenuComponent/Categories'
import ContainerBox from 'Component/MenuComponent/ContainerBox'
import DescriptionContainer from 'Component/MenuComponent/DescriptionContainer'
import { MenuModal } from 'Component/MenuComponent/MenuModal'
import { RestaurantContext } from 'Context/restaurant_context'
import { useContext } from 'react'
import { styled } from 'styled-components'

const MenuPage: React.FC = () => {
  const { restaurant } = useContext(RestaurantContext)
  const menus = restaurant?.menus

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
      <ContainerBox>
        <Categories ingre={menus[0].ingre}></Categories>
      </ContainerBox>
      <AddCart />
      {/* 모달 창 */}
      <ContainerBox>
        <MenuModal>
          <DescriptionContainer
            title={menus[0].name}
            price={menus[0].price}
            description={menus[0].description}
            img={menus[0].img[0]}
          ></DescriptionContainer>
          <ContainerBox>
            <Categories ingre={menus[0].ingre}></Categories>
          </ContainerBox>
          <AddCart />
        </MenuModal>
      </ContainerBox>

      <Footer />
    </div>
  )
}

export default MenuPage
