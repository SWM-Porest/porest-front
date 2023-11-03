import { Order, OrderMenu } from 'Api/OrderInterface'
import { useAccessToken } from 'Api/tokenCookie'
import useUserData from 'Api/useUserData'
import useUserOrderData from 'Api/useUserOrderData'
import OrderModal from 'Component/Modal/OrderModal'
import { getTimeDiff } from 'Pages/EditWaitingPage'
import getImageSrc from 'Utils/getImageSrc'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import styled from 'styled-components'

import { ChevronRight20Filled } from '@fluentui/react-icons'
import { Pagination, Select, Table } from 'antd'
const { Option } = Select

const OrderList = () => {
  const [accessToken, setAccessToken] = useAccessToken()
  const [orderId, setOrderId] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [sort, setSort] = useState(0)

  const queryparams = new URLSearchParams(location.search)
  const defaultOrderId = queryparams.get('orderId')

  const { data: userOrderData, isLoading, isError } = useUserOrderData(page, pageSize, sort, accessToken)
  const { data: userData } = useUserData(accessToken)

  const openModalHandler = (id: string) => {
    setOrderId(id)
    setIsOpen(!isOpen)
  }

  useEffect(() => {
    if (defaultOrderId) {
      openModalHandler(defaultOrderId)
    }
  }, [])

  const handlePageChange = (newPage: number) => {
    setPage(newPage)
  }

  const handlePageSizeChange = (newSize: number) => {
    setPageSize(newSize)
    setPage(1)
  }
  const handleSortChange = (newSort: number) => {
    setSort(newSort)
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
  const totalPages = Math.ceil(userOrderData.totalCount / pageSize)

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
  // const totalPrice = userOrderData.orders.reduce((total: number, order: Order) => total + calculateOrderTotal(order), 0)
  // console.log(userOrderData)
  return (
    <div>
      <div>
        {userData && userOrderData ? (
          <StyledContainer>
            <Container>
              <StyledTitle>
                {userData.nickname}님은 <ColoredText>{userOrderData.totalCount}</ColoredText>회 주문하셨습니다.
              </StyledTitle>
              <Select value={pageSize} style={{ width: 120, marginRight: '1rem' }} onChange={handlePageSizeChange}>
                <Option value={10}>10개씩 보기</Option>
                <Option value={20}>20개씩 보기</Option>
                <Option value={30}>30개씩 보기</Option>
              </Select>
              <Select value={sort} style={{ width: 120 }} onChange={handleSortChange}>
                <Option value={0}>최신순</Option>
                <Option value={1}>오래된 순</Option>
              </Select>
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
                      .map(
                        (menu, menuIndex) =>
                          menu.img && <MenuImage key={menuIndex} src={getImageSrc(menu.img)} alt="메뉴 이미지" />,
                        // <MenuImage key={menuIndex} src={getImageSrc(menu.img)} alt="메뉴 이미지" />
                      )}
                    <MenuDetailsContainer key={`menu_${order._id}`}>
                      <MenuDateContainer>{getTimeDiff(dayjs(order.updated_at))}</MenuDateContainer>
                      <RestaurantNameContainer>{order.restaurant_name}</RestaurantNameContainer>
                      <div>
                        {Object.values(order.menus)
                          .slice(0, 1)
                          .map((menu, menuIndex) => (
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
                  <ChevronRight20Filled color="#AAAAA" />
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
      <StyledPagination
        current={page}
        total={userOrderData.totalCount}
        pageSize={pageSize}
        showSizeChanger={false}
        onChange={handlePageChange}
      />
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

const StyledContainer = styled.div``

const OrderDetails = styled.div`
  border-top: 1px solid ${({ theme }) => theme.COLOR.common.gray[100]};

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
const StyledPagination = styled(Pagination)`
  display: flex;
  justify-content: center;
  padding: 1rem;
`
