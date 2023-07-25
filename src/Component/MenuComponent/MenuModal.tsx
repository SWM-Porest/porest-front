import { useState } from 'react'
import { styled } from 'styled-components'
import MenuHeader from './MenuHeader'
import DescriptionContainer from './DescriptionContainer'
import ContainerBox from './ContainerBox'
import Categories from './Categories'
import AddCart from './AddCart'
import { useRestaurantState } from 'Context/restaurantContext'
interface OwnProps {
  id: string
  isOpen: boolean
  openModalHandler: () => void
}

export const MenuModal: React.FC<OwnProps> = ({ id, isOpen, openModalHandler }) => {
  const state = useRestaurantState()
  const { data: restaurant, loading, error } = state.restaurant
  const menu = restaurant?.menus.find((e) => {
    if (e._id === id) return true
  })
  return (
    <>
      <ModalContainer>
        <ModalBackdrop $load={isOpen} onClick={openModalHandler} />
        <ModalView $load={isOpen} onClick={(e) => e.stopPropagation()}>
          <MenuHeader name={menu ? menu.name : ''} />
          <DescriptionContainer
            title={menu ? menu.name : ''}
            price={menu ? menu.price : 0}
            description={menu ? menu.description : ''}
            img={menu ? menu.img : ''}
          ></DescriptionContainer>
          <ContainerBox>
            <Categories ingre={menu ? menu.ingre : []}></Categories>
          </ContainerBox>
          <AddCart />
        </ModalView>
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
const ModalBackdrop = styled.div<{ $load: boolean }>`
  z-index: 30;
  height: 100%;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: end;
  background-color: rgba(0, 0, 0, 0.4);
  transform: ${(props) => (props.$load ? 'translateY(0)' : 'translateY(105%)')};
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`

const ModalView = styled.div<{ $load: boolean }>`
  z-index: 31;
  height: 100%;
  position: fixed;
  bottom: 0;
  border-radius: 40px 40px 0px 0px;
  width: 100%;
  height: 80%;
  background-color: #ffffff;
  transition: all 0.6s cubic-bezier(0.22, 0.61, 0.36, 1);
  transform: ${(props) => (props.$load ? 'translateY(0)' : 'translateY(105%)')};
`
