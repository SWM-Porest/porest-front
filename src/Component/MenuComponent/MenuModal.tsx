import { faXmark } from '@fortawesome/free-solid-svg-icons'
import AmountCheck from 'Component/AmountCheck'
import { useRestaurantState } from 'Context/restaurantContext'
import { useEffect, useState } from 'react'
import { styled } from 'styled-components'
import AddCart from './AddCart'
import Categories from './Categories'
import ContainerBox from './ContainerBox'
import DescriptionContainer from './DescriptionContainer'
import Header from 'Component/Header'
import { CloseButton, CloseButtonContainer } from 'Component/Modal/CartModal'

interface OwnProps {
  id: string
  isOpen: boolean
  openModalHandler: (menuId: string) => void
}

export const MenuModal: React.FC<OwnProps> = ({ id, isOpen, openModalHandler }) => {
  const { data: restaurant, loading, error } = useRestaurantState().restaurant
  const menu = restaurant?.menus.find((e) => {
    return e._id === id
  })

  if (isOpen) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = 'auto'
  }

  if (loading) return <div>로딩중 ... </div>
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
  useEffect(() => {
    setCount(1)
  }, [openModalHandler])
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
          <Header
            HeaderName={''}
            Right={
              <CloseButtonContainer>
                <CloseButton
                  icon={faXmark}
                  onClick={() => {
                    openModalHandler(menu ? menu._id : '')
                  }}
                  size="2xl"
                />
              </CloseButtonContainer>
            }
          ></Header>
          <ContentContainer>
            <DescriptionContainer
              title={menu ? menu.name : ''}
              price={menu ? menu.price : 0}
              description={menu ? menu.description : ''}
              img={menu ? menu.img : ''}
            ></DescriptionContainer>
            <ContainerBox>
              <Categories ingre={menu ? menu.ingre : []}></Categories>
            </ContainerBox>
            <StyledAmountContainer>
              <AmountCheck count={count} handleQuantity={handleQuantity} />
            </StyledAmountContainer>
            <AddCart menu={menu ? menu : null} cnt={count} openModalHandler={openModalHandler} />
          </ContentContainer>
        </ModalView>
      </ModalContainer>
    </>
  )
}
const StyledAmountContainer = styled.div`
  padding-left: 50pt;
`
const ModalContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`
const ModalBackdrop = styled.div<{ $load: boolean }>`
  z-index: 30;
  height: 100%;
  position: fixed;
  bottom: ${(props) => (props.$load ? '0' : '-100%')};
  display: flex;
  justify-content: center;
  align-items: end;
  background-color: rgba(0, 0, 0, 0.4);
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`

const ModalView = styled.div<{ $load: boolean }>`
  z-index: 31;
  height: 100%;
  position: fixed;
  bottom: ${(props) => (props.$load ? '0' : '-100%')};
  border-radius: 40px 40px 0px 0px;
  width: 100%;
  height: 80%;
  background-color: #ffffff;
  transition: all 0.6s cubic-bezier(0.22, 0.61, 0.36, 1);
`
const ContentContainer = styled.div`
  overflow-y: auto;
  max-height: calc(100% - 72px - 72pt); /* 헤더의 높이만큼 화면 높이에서 뺍니다. */
`
