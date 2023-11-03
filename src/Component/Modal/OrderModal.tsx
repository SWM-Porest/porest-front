import { Order, OrderMenu } from 'Api/OrderInterface'
import Header from 'Component/Header'
import OrderInfo from 'Component/ProfileComponent/OrderInfo'
import RestaurantInfo from 'Component/ProfileComponent/RestaurantInfo'
import TotalPrice from 'Component/ProfileComponent/TotalPrice'
import { getTimeDiff } from 'Pages/EditWaitingPage'
import type { StepsProps } from 'antd'
import { Popover, Steps } from 'antd'
import { ReactComponent as Chevron } from 'assets/Chevron.svg'
import dayjs from 'dayjs'
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
            Left={
              <Chevron
                width="2rem"
                height="2rem"
                fill="#212121"
                onClick={() => {
                  openModalHandler(order ? order._id : '')
                }}
              />
            }
            HeaderName={'주문내역'}
          />

          <ContentContainer>
            <CustomSteps direction="vertical" current={order.status - 1} progressDot={customDot}>
              {shouldShowStep(1) && (
                <Step title={getStatusText(1)} description={getTimeDiff(dayjs(`${order.status_updated_at[1]}`))} />
              )}
              {shouldShowStep(2) && (
                <Step title={getStatusText(2)} description={getTimeDiff(dayjs(`${order.status_updated_at[2]}`))} />
              )}
              {shouldShowStep(3) && (
                <Step title={getStatusText(3)} description={getTimeDiff(dayjs(`${order.status_updated_at[3]}`))} />
              )}
              {shouldShowStep(4) && (
                <Step title={getStatusText(4)} description={getTimeDiff(dayjs(`${order.status_updated_at[4]}`))} />
              )}
              {shouldShowStep(5) && (
                <Step title={getStatusText(5)} description={getTimeDiff(dayjs(`${order.status_updated_at[5]}`))} />
              )}
            </CustomSteps>

            <OrderInfoContainer>
              <RestaurantInfo
                restaurant_id={order.restaurant_id}
                restaurant_name={order.restaurant_name}
                restaurant_address={order.restaurant_address}
              />
              <InfoContainer>
                <OrderInfo order_menus={Object.values(order.menus)} />
              </InfoContainer>
              <TotalPrice total_price={orderTotalPrice} />
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
  @media screen and (min-width: ${({ theme }) => theme.MEDIA.tablet}) {
    width: ${({ theme }) => theme.MEDIA.mobile};
  }
`

const ModalView = styled.div<{ $load: boolean }>`
  z-index: 31;
  position: fixed;
  bottom: ${(props) => (props.$load ? '0' : '-100%')};
  width: 100vw;
  height: 100%;
  background-color: ${({ theme }) => theme.COLOR.common.gray[120]};
  transition: all 0.6s cubic-bezier(0.22, 0.61, 0.36, 1);
  @media screen and (min-width: ${({ theme }) => theme.MEDIA.tablet}) {
    width: ${({ theme }) => theme.MEDIA.mobile};
  }
`

const ModalBackdrop = styled.div<{ $load: boolean }>`
  z-index: 30;
  height: 100vh;
  bottom: ${(props) => (props.$load ? '0' : '-100vh')};
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  background-color: ${({ theme }) => theme.COLOR.common.black[20]};
  ${(props) => (props.$load ? 'top: 0; left: 0; right: 0;' : '')};
`

const ContentContainer = styled.div`
  cursor: default;
  overflow-y: auto;
  max-height: calc(100% - 7.2rem);
`

const CustomSteps = styled(Steps)`
  background-color: ${({ theme }) => theme.COLOR.hover};
  padding: 1rem 2rem;

  .ant-steps-item {
    font-family: 'pretendard';
  }

  .ant-steps-item-icon {
    .ant-steps-icon {
      .ant-steps-icon-dot {
        background-color: ${({ theme }) => theme.COLOR.common.gray[40]} !important;
      }
    }
  }
  .ant-steps-item-active {
    .ant-steps-icon {
      .ant-steps-icon-dot {
        background-color: ${({ theme }) => theme.COLOR.common.gray[20]} !important;
      }
    }
  }

  .ant-steps-item-finish {
    .ant-steps-item-container {
      .ant-steps-item-tail::after {
        background-color: ${({ theme }) => theme.COLOR.common.gray[40]};
      }
    }
  }
`

const OrderInfoContainer = styled.div`
  padding: 2rem 0;
`

const InfoContainer = styled.div`
  padding: 2rem 0;
`
