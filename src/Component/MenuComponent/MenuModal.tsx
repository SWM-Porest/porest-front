import { useRestaurantState } from 'Context/restaurantContext'
import { useState } from 'react'
import { styled } from 'styled-components'
import AddCart from './AddCart'
import Categories from './Categories'
import ContainerBox from './ContainerBox'
import DescriptionContainer from './DescriptionContainer'
import MenuHeader from './MenuHeader'
interface OwnProps {
  id: string
  isOpen: boolean
  openModalHandler: (menuId: string) => void
}

export const MenuModal: React.FC<OwnProps> = ({ id, isOpen, openModalHandler }) => {
  const state = useRestaurantState()
  const { data: restaurant, loading, error } = state.restaurant

  const menu = restaurant?.menus.find((e) => {
    return e._id === id
  })

  if (isOpen) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = 'auto'
  }

  if (loading) return <div>로딩중...</div>
  if (error) return <div>에러가 발생했습니다.</div>
  const [count, setCount] = useState(1)
  const handleQuantity = (type: string) => {
    if (type === 'plus') {
      setCount(count + 1)
    } else {
      if (count === 1) return
      setCount(count - 1)
    }
  }
  return (
    <>
      <ModalContainer>
        <ModalBackdrop
          $load={isOpen}
          onClick={() => {
            openModalHandler(menu ? menu._id : '')
          }}
        />
        <ModalView $load={isOpen} onClick={(e) => e.stopPropagation()}>
          <MenuHeader name={restaurant ? restaurant.name : ''} />
          <DescriptionContainer
            title={menu ? menu.name : ''}
            price={menu ? menu.price : 0}
            description={menu ? menu.description : ''}
            img={menu ? menu.img : ''}
          ></DescriptionContainer>
          <ContainerBox>
            <Categories ingre={menu ? menu.ingre : []}></Categories>
          </ContainerBox>

          <AmountContainer>
            <MinusButton onClick={() => handleQuantity('minus')}>-</MinusButton>
            <CountContainer>
              <CountSpan>{count}</CountSpan>
            </CountContainer>
            <PlusButton onClick={() => handleQuantity('plus')}>+</PlusButton>
          </AmountContainer>

          <AddCart menu={menu ? menu : null} />

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
  overflow-y: auto;
  background-color: #ffffff;
  transition: all 0.6s cubic-bezier(0.22, 0.61, 0.36, 1);
  transform: ${(props) => (props.$load ? 'translateY(0)' : 'translateY(105%)')};
`
const AmountContainer = styled.div`
  position: relative;
  width: 100pt;
  height: 80pt;
  border: 1px solid #c4c4c4;
  border-radius: 5px;
  margin-bottom: 30px;
`
const MinusButton = styled.button`
  position: absolute;
  width: 24pt;
  height: 24pt;
  top: 50%;
  left: 16pt;
  transform: translateY(-50%);
  cursor: pointer;
`
const PlusButton = styled.button`
  position: absolute;
  width: 24pt;
  height: 24pt;
  top: 50%;
  right: 16pt;
  transform: translateY(-50%);
  cursor: pointer;
`
const CountSpan = styled.span`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`
const CountContainer = styled.div`
  position: absolute;
  width: 56px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 1px solid #c4c4c4;
  border-top: none;
  border-bottom: none;
`
