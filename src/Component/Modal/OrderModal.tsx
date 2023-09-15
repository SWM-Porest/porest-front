import { faTimes } from '@fortawesome/free-solid-svg-icons'
import Header from 'Component/Header'
import { CloseButton, CloseButtonContainer } from 'Component/Modal/CartModal'
import formatDate from 'Component/formatDate'
import { Image } from 'Context/restaurantContext'
import { Steps } from 'antd'
import React from 'react'
import styled from 'styled-components'
const { Step } = Steps

interface Menu {
  menu_name: string
  price: number
  quantity: number
  img: Image
}

interface Order {
  restaurant_id: string
  restaurant_name: string
  restaurant_address: string
  updated_at: string
  _id: string
  menus: { [menuId: string]: Menu }
  status: number
  status_updated_at: { [status: string]: string }
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
  const shouldShowStep = (stepStatus: number) => {
    return order.status >= stepStatus
  }

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
            <CustomSteps direction="vertical" current={order.status - 1}>
              {shouldShowStep(1) && (
                <Step title={getStatusText(1)} description={formatDate(`${order.status_updated_at[1]}`)} />
              )}
              {shouldShowStep(2) && (
                <Step title={getStatusText(2)} description={formatDate(`${order.status_updated_at[2]}`)} />
              )}
              {shouldShowStep(3) && (
                <Step title={getStatusText(3)} description={formatDate(`${order.status_updated_at[3]}`)} />
              )}
              {shouldShowStep(4) && (
                <Step title={getStatusText(4)} description={formatDate(`${order.status_updated_at[4]}`)} />
              )}
              {shouldShowStep(5) && (
                <Step title={getStatusText(5)} description={formatDate(`${order.status_updated_at[5]}`)} />
              )}
            </CustomSteps>

            <OrderInfoContainer>
              <div>
                <OrderInfoLabel>주문 매장</OrderInfoLabel>
                <OrderInfoValue>
                  <OrderRestaurantName>{order.restaurant_name}</OrderRestaurantName>
                  <OrderRestaurantAddress>{order.restaurant_address}</OrderRestaurantAddress>
                </OrderInfoValue>
              </div>
              {Object.values(order.menus).map((menu, index) => (
                <MenuItem key={index}>
                  <MenuName>{menu.menu_name}</MenuName>
                  <MenuPrice>{menu.price.toLocaleString()}원</MenuPrice>
                  <MenuQuantity>x {menu.quantity}</MenuQuantity>
                </MenuItem>
              ))}
              <TotalPrice>
                <div>총 금액: </div>
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
  background-color: ${({ theme }) => theme.COLOR.common.gray[600]};
  ${(props) => (props.$load ? 'top: 0; left: 0; right: 0;' : '')};
`

const ModalView = styled.div<{ $load: boolean }>`
  z-index: 31;
  position: fixed;
  bottom: ${(props) => (props.$load ? '0' : '-100%')};
  border-radius: 40px 40px 0px 0px;
  width: 100%;
  height: 80%;
  background-color: ${({ theme }) => theme.COLOR.common.white};
  transition: all 0.6s cubic-bezier(0.22, 0.61, 0.36, 1);
`

const ContentContainer = styled.div`
  overflow-y: auto;
  max-height: calc(100% - 72px - 72pt);
  padding: 0 48pt;
`

const OrderInfoContainer = styled.div`
  margin-top: 16pt;
`

const OrderInfoLabel = styled.div`
  padding: 8pt;

  font-size: 2rem;
  background-color: ${({ theme }) => theme.COLOR.common.gray[700]};
`

const OrderInfoValue = styled.div`
  color: ${({ theme }) => theme.COLOR.common.gray[200]};
  padding: 8pt;
  border-top: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
`
const OrderRestaurantName = styled.div`
  padding-top: 8pt;
  font-size: 2rem;
  font-weight: bold;
`
const OrderRestaurantAddress = styled.div`
  padding: 4pt 0 8pt 0;
  font-size: 1.8rem;
`

const MenuItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8pt;
  font-size: 2rem;
`

const MenuName = styled.div`
  flex: 1;
  color: ${({ theme }) => theme.COLOR.common.gray[200]};
  font-weight: bold;
`

const MenuPrice = styled.div`
  margin-left: 16pt;
  color: ${({ theme }) => theme.COLOR.common.gray[700]};
`

const MenuQuantity = styled.div`
  margin-left: 16pt;
  color: ${({ theme }) => theme.COLOR.common.gray[700]};
`

const TotalPrice = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8pt;

  font-size: 2rem;
  background-color: ${({ theme }) => theme.COLOR.common.gray[700]};

  border-top: 1px solid #ddd;

  font-weight: bold;
`

const ColoredText = styled.span`
  color: ${({ theme }) => theme.COLOR.main};
`
const CustomSteps = styled(Steps)`
  .ant-steps-item {
    font-family: 'Noto Sans KR', sans-serif;
    font-weight: normal;
  }

  .ant-steps-item-process .ant-steps-item-title {
    font-weight: bold;
  }
`
