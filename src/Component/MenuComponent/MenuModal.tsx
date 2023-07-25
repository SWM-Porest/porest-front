import { useState } from 'react'
import { styled } from 'styled-components'
import ModalWindow from './ModalWindow'
import MenuHeader from './MenuHeader'
import DescriptionContainer from './DescriptionContainer'
import ContainerBox from './ContainerBox'
import Categories from './Categories'
import AddCart from './AddCart'

export const MenuModal: React.FC = ({ restaurant }, { children }) => {
  const [isOpen, setIsOpen] = useState(false)
  console.log(isOpen ? 'true' : 'false')
  const openModalHandler = () => {
    setIsOpen(!isOpen)
  }

  return (
    <>
      <ModalContainer>
        <ModalWindow>
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
        </ModalWindow>
      </ModalContainer>
    </>
  )
}

const ModalContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`
