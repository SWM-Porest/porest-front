import { faTimes } from '@fortawesome/free-solid-svg-icons'
import Header from 'Component/Header'
import { CloseButton, CloseButtonContainer } from 'Component/Modal/CartModal'
import { Image } from 'Context/restaurantContext'
import React from 'react'
import styled from 'styled-components'

interface Menu {
  menu_name: string
  price: number
  quantity: number
  img: Image
}

interface Order {
  restaurant_id: number
  restaurant_name: string
  updated_at: string
  _id: string
  menus: Menu[]
  status: number
}

interface OwnProps {
  order: Order
  isOpen: boolean
  openModalHandler: (menuId: string) => void
}

const OrderModal: React.FC<OwnProps> = ({ order, isOpen, openModalHandler }) => {
  if (isOpen) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = 'auto'
  }
  console.log(order)
  return (
    <>
      <ModalContainer>
        <ModalBackdrop
          $load={isOpen}
          onClick={() => {
            openModalHandler(order ? order._id : '')
          }}
        />

        <ModalView $load={isOpen} onClick={(e) => e.stopPropagation()}>
          <Header
            HeaderName="주문 히스토리"
            Right={
              <CloseButtonContainer>
                <CloseButton
                  icon={faTimes}
                  onClick={() => {
                    openModalHandler(order ? order._id : '')
                  }}
                  size="2x"
                />
              </CloseButtonContainer>
            }
          ></Header>

          <ContentContainer>
            <StatusText visible={order.status >= 1} color={order.status >= 2 ? getStatusColor(2) : getStatusColor(1)}>
              {getStatusText(1)}
            </StatusText>
            <StatusText visible={order.status >= 2} color={order.status >= 3 ? getStatusColor(2) : getStatusColor(1)}>
              {getStatusText(2)}
            </StatusText>
            <StatusText visible={order.status >= 3} color={order.status >= 4 ? getStatusColor(2) : getStatusColor(1)}>
              {getStatusText(3)}
            </StatusText>
            <StatusText visible={order.status >= 4} color={order.status >= 5 ? getStatusColor(2) : getStatusColor(1)}>
              {getStatusText(4)}
            </StatusText>
            <StatusText visible={order.status >= 5} color={order.status >= 6 ? getStatusColor(2) : getStatusColor(1)}>
              {getStatusText(5)}
            </StatusText>

            <OrderInfoContainer>
              <div>
                <OrderInfoLabel>주문 매장</OrderInfoLabel>
                <OrderInfoValue>{order.restaurant_name}</OrderInfoValue>
              </div>
              {Object.values(order.menus).map((menu, index) => (
                <MenuItem key={index}>
                  <MenuName>{menu.menu_name}</MenuName>
                  <MenuPrice>{menu.price}원</MenuPrice>
                  <MenuQuantity>x{menu.quantity}</MenuQuantity>
                </MenuItem>
              ))}
              <TotalPrice>
                총 금액:{' '}
                <ColoredText>
                  {Object.values(order.menus)
                    .reduce((menuTotal: number, menu: Menu) => menuTotal + menu.price * menu.quantity, 0)
                    .toLocaleString()}
                  원
                </ColoredText>
              </TotalPrice>
            </OrderInfoContainer>
          </ContentContainer>
        </ModalView>
      </ModalContainer>
    </>
  )
}

export default OrderModal

const ModalContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`

const ModalBackdrop = styled.div<{ $load: boolean }>`
  z-index: 30;
  height: 100vh;
  bottom: ${(props) => (props.$load ? '0' : '-100vh')};
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  background-color: rgba(0, 0, 0, 0.4);
  ${(props) => (props.$load ? 'top: 0; left: 0; right: 0;' : '')};
`

const ModalView = styled.div<{ $load: boolean }>`
  z-index: 31;
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
  max-height: calc(100% - 72px - 72pt);
  padding: 20px;
`

const OrderInfoContainer = styled.div`
  margin-top: 20px;
`

const OrderInfoLabel = styled.div`
  font-weight: bold;
  margin-bottom: 5px;
`

const OrderInfoValue = styled.div`
  color: #555;
`

const MenuItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
`

const MenuName = styled.div`
  flex: 1;
`

const MenuPrice = styled.div`
  margin-left: 10px;
`

const MenuQuantity = styled.div`
  margin-left: 10px;
  color: #555;
`

const TotalPrice = styled.div`
  font-weight: bold;
  margin-top: 20px;
`

const ColoredText = styled.span`
  color: ${({ theme }) => theme.COLOR.main};
`

const StatusText = styled.div<{ visible: boolean; color: string }>`
  font-weight: bold;
  padding: 4px 8px;
  border-radius: 4px;
  visibility: ${({ visible }) => (visible ? 'visible' : 'hidden')};
  color: ${({ color }) => (color === 'gray' ? 'blue' : 'gray')};
  background-color: ${({ color }) => (color === 'gray' ? 'lightblue' : 'lightgray')};
`

const getStatusColor = (status: number) => {
  switch (status) {
    case 1:
      return 'gray'
    case 2:
      return 'yellow'
    case 3:
      return 'green'
    case 4:
      return 'blue'
    case 5:
      return 'purple'
    default:
      return 'gray'
  }
}

const getStatusText = (status: number) => {
  switch (status) {
    case 1:
      return '접수중'
    case 2:
      return '준비중'
    case 3:
      return '준비 완료'
    case 4:
      return '서빙 완료'
    case 5:
      return '결제 완료'
    default:
      return '상태 없음'
  }
}
