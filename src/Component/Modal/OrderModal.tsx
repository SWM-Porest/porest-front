import { faTimes } from '@fortawesome/free-solid-svg-icons'
import Header from 'Component/Header'
import { CloseButton, CloseButtonContainer } from 'Component/Modal/CartModal'
import formatDate from 'Component/formatDate'
import { Image } from 'Context/restaurantContext'
import type { StepsProps } from 'antd'
import { Popover, Steps } from 'antd'
import React from 'react'
import styled from 'styled-components'

const { Step } = Steps
const customDot: StepsProps['progressDot'] = (dot, { status, index }) => (
  <Popover
    content={
      <span>
        step {index} status: {status}
      </span>
    }
  >
    {dot}
  </Popover>
)

interface OptionItem {
  name: string
  price: number
}

interface MenuOption {
  name: string
  items: OptionItem[]
}

interface OrderMenu {
  menu_name: string
  price: number
  quantity: number
  img: Image
  options: MenuOption[]
}

interface Order {
  restaurant_id: string
  restaurant_name: string
  restaurant_address: string
  updated_at: string
  _id: string
  menus: { [menuId: string]: OrderMenu }
  status: number
  status_updated_at: { [status: number]: string }
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
  const calculateTotalPrice = (menu: OrderMenu) => {
    let totalPrice = menu.price * menu.quantity

    // Calculate the total price of menu options
    menu.options.forEach((option) => {
      if (Array.isArray(option.items)) {
        option.items.forEach((item) => {
          totalPrice += item.price
        })
      }
    })

    return totalPrice
  }

  const orderTotalPrice = Object.values(order.menus).reduce(
    (orderTotal: number, menu: OrderMenu) => orderTotal + calculateTotalPrice(menu),
    0,
  )

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
            <CustomSteps direction="vertical" current={order.status - 1} progressDot={customDot}>
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
                <div key={index}>
                  <MenuName>{menu.menu_name}</MenuName>
                  <MenuItem>
                    <MenuPrice>{menu.price.toLocaleString()}원</MenuPrice>
                    <MenuPrice>{menu.quantity} 개</MenuPrice>
                    <span />
                    <MenuPrice>{(menu.price * menu.quantity).toLocaleString()}원</MenuPrice>
                  </MenuItem>
                  {menu.options.map((option) => (
                    <div key={option.name}>
                      {Array.isArray(option.items) && option.items.length > 0 ? (
                        <OptionContainer>
                          {option.items.map((item) => (
                            <MenuItem key={item.name}>
                              <OptionName>{option.name}</OptionName>
                              <OptionName>{item.name} </OptionName>
                              <span />
                              <OptionPrice>{item.price.toLocaleString()}원</OptionPrice>
                            </MenuItem>
                          ))}
                        </OptionContainer>
                      ) : (
                        <p>옵션이 없습니다.</p>
                      )}
                    </div>
                  ))}
                </div>
              ))}
              <TotalPrice>
                <div>총 금액: </div>
                <ColoredText>{orderTotalPrice.toLocaleString()}원</ColoredText>
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
  cursor: default;
  overflow-y: auto;
  max-height: calc(100% - 72px - 72pt);
`

const CustomSteps = styled(Steps)`
  background-color: ${({ theme }) => theme.COLOR.hover};
  padding: 32pt 0 0 32pt;

  .ant-steps-item {
    font-family: 'Noto Sans KR', sans-serif;
    font-weight: normal;
    height: 96pt;
  }
  .ant-steps-item-title {
    font-size: 2rem;
    padding-left: 8pt;
  }
  .ant-steps-item-description {
    font-size: 1.8rem;
    padding-left: 8pt;
  }
  .ant-steps-item-process .ant-steps-item-title {
    font-weight: bold;
  }
  .ant-steps-item-icon {
    .ant-steps-icon {
      .ant-steps-icon-dot {
        background-color: ${({ theme }) => theme.COLOR.common.gray[400]} !important;
      }
    }
  }
  .ant-steps-item-active {
    .ant-steps-icon {
      .ant-steps-icon-dot {
        background-color: ${({ theme }) => theme.COLOR.common.gray[200]} !important;
      }
    }
  }

  .ant-steps-item-finish {
    .ant-steps-item-container {
      .ant-steps-item-tail::after {
        background-color: ${({ theme }) => theme.COLOR.common.gray[400]};
      }
    }
  }
`

const OrderInfoContainer = styled.div``

const OrderInfoLabel = styled.div`
  padding: 24pt 32pt;
  font-size: 2rem;
  background-color: ${({ theme }) => theme.COLOR.common.gray[700]};
`

const OrderInfoValue = styled.div`
  color: ${({ theme }) => theme.COLOR.common.gray[200]};
  padding: 24pt 32pt;
  border-bottom: 1px solid #ddd;
`
const OrderRestaurantName = styled.div`
  font-size: 2rem;
  font-weight: bold;
`
const OrderRestaurantAddress = styled.div`
  padding: 8pt 0;
  font-size: 1.8rem;
`
const MenuName = styled.div`
  padding: 24pt 32pt;
  font-weight: bold;
  font-size: 2.3rem;
  border-top: 1px solid #ddd;
`

const MenuItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8pt 48pt;
  font-size: 2rem;
`

const MenuPrice = styled.div`
  color: ${({ theme }) => theme.COLOR.common.gray[400]};
`
const OptionContainer = styled.div`
  padding: 8pt 0;
`

const OptionName = styled.div`
  color: ${({ theme }) => theme.COLOR.common.gray[600]};
`

const OptionPrice = styled.div`
  color: ${({ theme }) => theme.COLOR.common.gray[600]};
`
const TotalPrice = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24pt 32pt;
  font-size: 2.3rem;
  background-color: ${({ theme }) => theme.COLOR.common.gray[700]};
  font-weight: bold;
`

const ColoredText = styled.span`
  color: ${({ theme }) => theme.COLOR.sub};
`
