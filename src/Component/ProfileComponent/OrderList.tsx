import { useAccessToken } from 'Api/tokenCookie'
import useUserData from 'Api/useUserData'
import useUserOrderData from 'Api/useUserOrderData'
import OrderModal from 'Component/Modal/OrderModal'
import formatDate from 'Component/formatDate'
import getImageSrc from 'Component/getImageSrc'
import { Image } from 'Context/restaurantContext'
import { Table } from 'antd'
import { useState } from 'react'
import styled from 'styled-components'

interface OptionItem {
  name: string
  price: number
}

interface MenuOption {
  name: string
  items: OptionItem[]
}

export interface OrderMenu {
  menu_name: string
  price: number
  quantity: number
  img: Image
  options: MenuOption[]
}

export interface Order {
  restaurant_id: string
  restaurant_name: string
  restaurant_address: string
  updated_at: string
  _id: string
  menus: { [menuId: string]: OrderMenu }
  status: number
  status_updated_at: { [status: number]: string }
}

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

  const totalPrice = userOrderData.orders.reduce((total: number, order: Order) => {
    if (typeof order.menus === 'object') {
      const orderTotal = Object.values(order.menus).reduce((menuTotal, menu) => {
        return menuTotal + menu.price * menu.quantity
      }, 0)
      return total + orderTotal
    }
    return total
  }, 0)

  return (
    <div>
      <div>
        {userData && userOrderData ? (
          <StyledContainer>
            <StyledTitle>
              {userData.nickname}님은 <ColoredText>{userOrderData.orders.length}</ColoredText>회 주문하셨고,
            </StyledTitle>
            <StyledTitle>
              <ColoredText>{totalPrice.toLocaleString()}</ColoredText>원 결제하셨어요.
            </StyledTitle>
            <StyledTable columns={restaurantOrderColumns} dataSource={restaurantOrderDataSource} pagination={false} />

            {userOrderData.orders.map((order: Order) => (
              <div key={order._id}>
                <OrderModal
                  order={order}
                  isOpen={isOpen && orderId === order._id}
                  openModalHandler={() => {
                    openModalHandler(order._id)
                  }}
                />
                <OrderDetails>
                  <MenuImageContainer>
                    {Object.values(order.menus)
                      .slice(0, 1)
                      .map((menu: OrderMenu, menuIndex: number) => (
                        <MenuImage key={menuIndex} src={getImageSrc(menu.img)} alt="메뉴 이미지" />
                      ))}
                  </MenuImageContainer>
                  <MenuDetailsContainer
                    key={`menu_${order._id}`}
                    onClick={() => {
                      openModalHandler(order._id)
                    }}
                  >
                    {Object.values(order.menus)
                      .slice(0, 1)
                      .map((menu: OrderMenu, menuIndex: number) => (
                        <MenuNameContainer key={menuIndex}>
                          <div>
                            {Object.values(order.menus).length > 1 ? (
                              <div>
                                {menu.menu_name} 외 {Object.values(order.menus).length - 1}개
                              </div>
                            ) : (
                              <div> {menu.menu_name} </div>
                            )}
                          </div>
                        </MenuNameContainer>
                      ))}

                    <MenuInfoContainer>
                      <MenuDateContainer>{formatDate(order.updated_at)}</MenuDateContainer>

                      <div>
                        <RestaurantNameContainer>{order.restaurant_name}</RestaurantNameContainer>
                        <ColoredText>
                          {Object.values(order.menus)
                            .reduce((menuTotal: number, menu: OrderMenu) => menuTotal + menu.price * menu.quantity, 0)
                            .toLocaleString()}
                          원
                        </ColoredText>
                      </div>
                    </MenuInfoContainer>
                  </MenuDetailsContainer>
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
  padding-left: 8pt;
`

const StyledTable = styled(Table)`
  margin-top: 24pt;
  margin-bottom: 24pt;

  th {
    font-size: 2rem;
  }

  td.ant-table-cell {
    font-size: 2rem;
  }
`

const StyledContainer = styled.div`
  padding: 48pt;
  border: 1px solid #ddd;
  border-radius: 4pt;
  box-shadow: 0 0 4pt rgba(0, 0, 0, 0.1);
`

const OrderDetails = styled.div`
  border: 1px solid #ddd;

  height: 160pt;
  display: flex;
  padding: 24pt 48pt;
  justify-content: space-between;
  cursor: pointer;
`
const MenuImageContainer = styled.div`
  position: relative;
  width: 112pt;
  padding-top: 112pt;
`

const MenuDetailsContainer = styled.div`
  padding-left: 24pt;
  width: 80%;
`
const MenuNameContainer = styled.div`
  font-size: 2rem;
  font-weight: bold;
  padding: 16pt 0;
`

const MenuDateContainer = styled.div`
  color: ${({ theme }) => theme.COLOR.common.gray[400]};
`

const RestaurantNameContainer = styled.span`
  padding-right: 8pt;
`
const ColoredText = styled.span`
  color: ${({ theme }) => theme.COLOR.main};
`

const MenuInfoContainer = styled.div`
  display: flex;
  padding: 8pt 0;
  justify-content: space-between;
  font-size: 1.8rem;
`

const MenuImage = styled.img`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  border-radius: 50%;
`
