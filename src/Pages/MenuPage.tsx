import Footer from 'Component/Footer'
import Header from 'Component/Header'
import Categories from 'Component/MenuComponent/Categories'
import ContainerBox from 'Component/MenuComponent/ContainerBox'
import DescriptionContainer from 'Component/MenuComponent/DescriptionContainer'
import { Menu, Restaurant } from 'model/restaurant'

const data: Restaurant = {
  name: '교동짬뽕',
  category: 'western',
  address: {
    city: 'seolleung',
    detail: 'somewhere',
    zipCode: 2342345,
  },
  menu: [
    {
      name: '짜장',
      menutype: '요리류',
      price: 2000,
      category: 'PASTA',
      description:
        '양파, 양배추 등 채소와 돼지고기에 기름으로 튀긴 춘장을 넣어 굵은 국수에 비벼서 먹는 한국식 중국 요리로, 짬뽕, 우동하고 더불어 트로이카 메뉴',
      img: 'img/짜장.png',
      ingre: ['밀가루', '치즈', '토마토', '바질'],
    },
    {
      name: '짬뽕',
      menutype: '요리류',
      price: 3000,
      category: 'PASTA',
      description: '설명',
      img: 'img/짬뽕.webp',
      ingre: ['밀가루', '치즈', '토마토', '바질'],
    },
    {
      name: '음료',
      menutype: '주류',
      price: 5000,
      category: 'PASTA',
      description: '설명',
      img: 'img/환타.jpg',
      ingre: ['재료'],
    },
  ],
}

const MenuPage: React.FC = () => {
  const menu: Menu = {
    name: '짜장',
    menutype: '요리류',
    price: 2000,
    category: 'PASTA',
    description:
      '양파, 양배추 등 채소와 돼지고기에 기름으로 튀긴 춘장을 넣어 굵은 국수에 비벼서 먹는 한국식 중국 요리로, 짬뽕, 우동하고 더불어 트로이카 메뉴',
    img: 'img/짜장.jpg',
    ingre: ['밀가루', '치즈', '토마토', '바질'],
  }
  return (
    <div>
      <Header HeaderName={menu.name} />
      <DescriptionContainer title={menu.name} price={menu.price} description={menu.description}></DescriptionContainer>
      {/* 메뉴 정보 및 선택 블럭 */}
      <ContainerBox>
        <Categories ingre={menu.ingre}></Categories>
      </ContainerBox>
      <Footer />
    </div>
  )
}

export default MenuPage
