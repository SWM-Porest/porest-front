import Footer from 'Component/Footer'
import Header from 'Component/Header'
import AddCart from 'Component/MenuComponent/AddCart'
import Categories from 'Component/MenuComponent/Categories'
import ContainerBox from 'Component/MenuComponent/ContainerBox'
import DescriptionContainer from 'Component/MenuComponent/DescriptionContainer'
import { RestaurantContext } from 'Context/restaurant_context'
import { Menu } from 'model/restaurant'
import { useContext } from 'react'

const MenuPage: React.FC<Menu> = (menu: Menu) => {
  return (
    <div>
      <h1>MenuPage</h1>
      <Header HeaderName={menu.name} />
      <DescriptionContainer
        title={menu.name}
        price={menu.price}
        description={menu.description}
        img={menu.img}
      ></DescriptionContainer>
      {/* 메뉴 정보 및 선택 블럭 */}
      <ContainerBox>
        <Categories ingre={menu.ingre}></Categories>
      </ContainerBox>
      <AddCart />
      <Footer />
    </div>
  )
}

export default MenuPage
