import { Order, OrderMenu } from 'Api/OrderInterface'
import { useAccessToken } from 'Api/tokenCookie'
import useUserData from 'Api/useUserData'
import useUserOrderData from 'Api/useUserOrderData'
import OrderModal from 'Component/Modal/OrderModal'
import formatDate from 'Utils/formatDate'
import getImageSrc from 'Utils/getImageSrc'
import { Table } from 'antd'
import { ReactComponent as ChevronR } from 'assets/ChevronR.svg'
import { useState } from 'react'
import styled from 'styled-components'

const OrderList = () => {
  const page = 1 // page 변수 정의
  const pageSize = 10 // pageSize 변수 정의
  const sort = 0 // sort 변수 정의

  const [accessToken, setAccessToken] = useAccessToken()
  const [orderId, setOrderId] = useState('')
  const [isOpen, setIsOpen] = useState(false)

  const { data: userOrderData, isLoading, isError } = useUserOrderData(page, pageSize, sort, accessToken)
  const { data: userData } = useUserData(accessToken)

  const openModalHandler = (id: string) => {
    setOrderId(id)
    setIsOpen(!isOpen)
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return `${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate()} ${date.getHours()}:${date.getMinutes()}`
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>Error fetching data</div>
  }

  if (!userData || !userOrderData || !Array.isArray(userOrderData.orders)) {
    return <div>No orders found.</div>
  }

  const restaurantOrders: Record<string, { name: string; count: number }> = {}
  userOrderData.orders.forEach((order: Order) => {
    const { restaurant_id, restaurant_name } = order
    if (restaurant_id in restaurantOrders) {
      restaurantOrders[restaurant_id].count++
    } else {
      restaurantOrders[restaurant_id] = {
        name: restaurant_name,
        count: 1,
      }
    }
  })
  const restaurantOrderDataSource = Object.keys(restaurantOrders).map((restaurant_id) => ({
    key: restaurant_id,
    restaurant: restaurantOrders[restaurant_id].name,
    orderCount: restaurantOrders[restaurant_id].count,
  }))

  const restaurantOrderColumns = [
    {
      title: '레스토랑',
      dataIndex: 'restaurant',
      key: 'restaurant',
    },
    {
      title: '주문 횟수',
      dataIndex: 'orderCount',
      key: 'orderCount',
      render: (text: number) => <span>{text}회</span>,
    },
  ]

  const calculateOrderTotal = (order: Order): number => {
    return Object.values(order.menus).reduce((menuTotal: number, menu: OrderMenu) => {
      let menuPrice = menu.price * menu.quantity

      menu.options.forEach((option) => {
        if (Array.isArray(option.items)) {
          option.items.forEach((item) => {
            menuPrice += item.price
          })
        }
      })

      return menuTotal + menuPrice
    }, 0)
  }
  const totalPrice = userOrderData.orders.reduce((total: number, order: Order) => total + calculateOrderTotal(order), 0)

  return (
    <div>
      <div>
        {userData && userOrderData ? (
          <StyledContainer>
            <Container>
              <StyledTitle>
                {userData.nickname}님은 <ColoredText>{userOrderData.orders.length}</ColoredText>회 주문하셨고,
              </StyledTitle>
              <StyledTitle>
                <ColoredText>{totalPrice.toLocaleString()}</ColoredText>원 결제하셨어요.
              </StyledTitle>
              <StyledTable columns={restaurantOrderColumns} dataSource={restaurantOrderDataSource} pagination={false} />
            </Container>
            {userOrderData.orders.map((order: Order) => (
              <div key={order._id}>
                <OrderModal
                  order={order}
                  isOpen={isOpen && orderId === order._id}
                  openModalHandler={() => {
                    openModalHandler(order._id)
                  }}
                />
                <OrderDetails
                  onClick={() => {
                    openModalHandler(order._id)
                  }}
                >
                  <InfoContainer>
                    {Object.values(order.menus)
                      .slice(0, 1)
                      .map((menu: OrderMenu, menuIndex: number) => (
                        <MenuImage key={menuIndex} src={getImageSrc(menu.img)} alt="메뉴 이미지" />
                      ))}
                    <MenuDetailsContainer key={`menu_${order._id}`}>
                      <MenuDateContainer>{formatDate(order.updated_at)}</MenuDateContainer>
                      <RestaurantNameContainer>{order.restaurant_name}</RestaurantNameContainer>
                      <div>
                        {Object.values(order.menus)
                          .slice(0, 1)
                          .map((menu: OrderMenu, menuIndex: number) => (
                            <StyledSpan key={menuIndex}>
                              {Object.values(order.menus).length > 1 ? (
                                <span>
                                  {menu.menu_name} 외 {Object.values(order.menus).length - 1}개{' '}
                                  {calculateOrderTotal(order).toLocaleString()} 원
                                </span>
                              ) : (
                                <span>
                                  {' '}
                                  {menu.menu_name} {calculateOrderTotal(order).toLocaleString()} 원
                                </span>
                              )}
                            </StyledSpan>
                          ))}
                      </div>
                    </MenuDetailsContainer>
                  </InfoContainer>
                  <ChevronR />
                </OrderDetails>
              </div>
            ))}
          </StyledContainer>
        ) : (
          <StyledContainer>
            <h5>데이터를 불러오는 중...</h5>
          </StyledContainer>
        )}
      </div>
    </div>
  )
}

export default OrderList

const StyledTitle = styled.div`
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 8pt;
  cursor: default;
`

const Container = styled.div`
  padding: 24pt;
`
const StyledTable = styled(Table)`
  cursor: default;
`

const StyledContainer = styled.div`
  border: 1px solid ${({ theme }) => theme.COLOR.common.gray[100]};

  box-shadow: 0 0 4pt rgba(0, 0, 0, 0.1);
`

const OrderDetails = styled.div`
  border: 1px solid ${({ theme }) => theme.COLOR.common.gray[100]};

  display: flex;
  cursor: pointer;

  width: 100%;
  padding: 2rem;
  justify-content: space-between;
  align-items: center;
`
const InfoContainer = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1.6rem;
`

const ColoredText = styled.span`
  color: ${({ theme }) => theme.COLOR.main};
`

const MenuImage = styled.img`
  width: 6.2rem;
  aspect-ratio: 1/1;
  border-radius: 1.2rem;
  border: 0.5px solid rgba(0, 0, 0, 0.04);
  background: url(<path-to-image>), lightgray 50% / cover no-repeat;
`

const MenuDetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.4rem;
`

const MenuDateContainer = styled.h5`
  color: ${({ theme }) => theme.COLOR.common.gray[40]};
  margin: 0;
  font-style: normal;
  font-weight: 400;
  line-height: 1.6rem;
`
const RestaurantNameContainer = styled.h4`
  color: ${({ theme }) => theme.COLOR.common.gray[20]};
  margin: 0;
  font-style: normal;
  font-weight: 700;
  line-height: 2rem;
`

const StyledSpan = styled.span`
  color: ${({ theme }) => theme.COLOR.common.gray[30]};
  font-size: 1.4rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1.8rem;
`
