import UseUserData from 'Api/UseUserData'
import { useAuth } from 'Context/AuthContext'
import { Table } from 'antd'
import styled from 'styled-components'

interface Item {
  menu_name: string
  price: number
}

interface Order {
  restaurant: string
  date: string
  items: Item[]
}

interface UserData {
  name: string
  orders: Order[]
}

const defaultUserData: UserData = {
  name: '최지영',
  orders: [
    {
      restaurant: '이삭토스트 서울 중랑역점',
      date: '21년 5월 1일 토요일 오전 10시 50분',
      items: [{ menu_name: '햄치즈 토스트', price: 3000 }],
    },
    {
      restaurant: '파리바게트 서울 선릉점',
      date: '22년 4월 3일 토요일 오전 10시 50분',
      items: [
        { menu_name: '크로와상', price: 4000 },
        { menu_name: '빵', price: 7000 },
      ],
    },
    {
      restaurant: '파리바게트 서울 선릉점',
      date: '22년 4월 5일 토요일 오전 10시 50분',
      items: [
        { menu_name: '크로와상', price: 4000 },
        { menu_name: '크로와상', price: 4000 },
        { menu_name: '크로와상', price: 4000 },
      ],
    },
  ],
}

const OrderList = () => {
  // const orderListState = useOrderListState()
  //const [userData, setUserData] = useState<UserData | null>(defaultUserData)
  const userId = 'your_user_id' // userId 변수 정의
  const page = 1 // page 변수 정의
  const pageSize = 10 // pageSize 변수 정의
  const sort = 'asc' // sort 변수 정의
  const accessToken = useAuth().accessToken // accessToken 변수 정의
  const { data: userData, isLoading, isError } = UseUserData(userId, page, pageSize, sort, accessToken)

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>Error fetching data</div>
  }
  // 매장별 주문 회수 통계를 생성
  const restaurantOrders: Record<string, number> = {}
  if (userData) {
    userData.orders.forEach((order: Order) => {
      // 매장 이름을 키로 사용하여 주문 횟수를 누적
      if (order.restaurant in restaurantOrders) {
        restaurantOrders[order.restaurant]++
      } else {
        restaurantOrders[order.restaurant] = 1
      }
    })
  }

  const restaurantOrderDataSource = Object.keys(restaurantOrders).map((restaurant) => ({
    restaurant,
    orderCount: restaurantOrders[restaurant],
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
    },
  ]

  return (
    <div>
      <div>
        {userData ? (
          <StyledContainer>
            <h5>
              {userData.name}님은 <StyledColor>{userData.orders.length}</StyledColor>회 주문하셨고,
            </h5>
            <h5>
              <StyledColor>
                {userData.orders
                  .reduce(
                    (totalAmount: number, order: Order) =>
                      totalAmount + order.items.reduce((itemTotal: number, item: Item) => itemTotal + item.price, 0),
                    0,
                  )
                  .toLocaleString()}
              </StyledColor>
              원 결제하셨어요.
            </h5>
            <StyledTable columns={restaurantOrderColumns} dataSource={restaurantOrderDataSource} pagination={false} />

            {userData.orders.map((order: Order, index: number) => (
              <OrderDetails key={index}>
                <StyledRestaurant>매장: {order.restaurant}</StyledRestaurant>
                <StyledTime>구매일시: {order.date}</StyledTime>
                {order.items.map((item, itemIndex) => (
                  <StyledOrderContainer key={itemIndex}>
                    <p>{item.menu_name}</p>
                    <p>{item.price.toLocaleString()}원</p>
                  </StyledOrderContainer>
                ))}
                <StyledOrderContainer>
                  <p>총 가격:</p>
                  <p>{order.items.reduce((itemTotal, item) => itemTotal + item.price, 0).toLocaleString()}원</p>
                </StyledOrderContainer>
              </OrderDetails>
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

const StyledTable = styled(Table)`
  margin-top: 24pt;

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
  border-radius: 4pt;
  padding: 16pt;
  margin-top: 24pt;
`

const StyledColor = styled.span`
  color: ${({ theme }) => theme.COLOR.main};
`

const StyledRestaurant = styled.p`
  color: ${({ theme }) => theme.COLOR.common.gray[200]};
  font-size: 2rem;
  font-weight: bold;
`
const StyledTime = styled.p`
  color: ${({ theme }) => theme.COLOR.common.gray[500]};
`
const StyledOrderContainer = styled.div`
  display: flex;
  justify-content: space-between;
`
