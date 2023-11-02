import { CheckCircleOutlined, ClockCircleOutlined, MinusCircleOutlined, SyncOutlined } from '@ant-design/icons'
import { Order } from 'Api/OrderInterface'
import { orderService } from 'Api/orderService'
import { useAccessToken } from 'Api/tokenCookie'
import Loading from 'Component/Loading'
import { getTimeDiff } from 'Pages/EditWaitingPage'
import ErrorPage from 'Pages/ErrorPage'
import { onOrder } from 'Socket/socketio'
import { Button, List, Space, Tabs, TabsProps, Tag, message } from 'antd'
import { ReactComponent as ChevronD } from 'assets/ChevronD.svg'
import { ReactComponent as ChevronR } from 'assets/ChevronR.svg'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'

const RestaurantOrderList = () => {
  const { id } = useParams()

  if (id === undefined) throw new Error('id가 없습니다.')

  const [access_token, setAcessToken] = useAccessToken()

  const { data, isError, isLoading, isFetching } = useQuery<Order[]>(
    'orderList',
    () => orderService.getOrders(id, access_token),
    {
      staleTime: 1000 * 60 * 60 * 24,
    },
  )

  const queryClient = useQueryClient()

  const updateOrderStatusMutation = useMutation(
    (order: Order) => {
      return orderService.changeStatus(order._id, access_token, order.status + 1)
    },
    {
      onSuccess: async () => {
        queryClient.setQueriesData('orderList', data)

        await queryClient.refetchQueries('orderList')
      },
      onError: (error) => {
        console.log(error)
      },
    },
  )

  const getStatusColor = (status: number) => {
    switch (status) {
      case 1:
        return 'default'
      case 2:
        return 'processing'
      case 3:
        return 'success'
      case 4:
        return 'success'
      case 5:
        return 'success'
      default:
        return 'default'
    }
  }

  const getStatusButtonText = (status: number) => {
    switch (status) {
      case 1:
        return '접수하기'
      case 2:
      case 3:
      case 4:
      case 5:
        return '조리 완료'
      default:
        return '상태 없음'
    }
  }

  const changeStatus = (order: Order) => {
    if (order.status == 3) {
      message.error('이미 조리가 완료된 주문입니다.')
      return
    }
    if (order.status == 4) {
      message.error('이미 서빙이 완료된 주문입니다.')
      return
    }
    if (order.status >= 5) {
      message.error('이미 결제가 완료된 주문입니다.')
      return
    }
    try {
      updateOrderStatusMutation.mutateAsync(order)
    } catch (e) {
      console.log(e)
    }
  }
  const getStatusIcon = (status: number) => {
    switch (status) {
      case 1:
        return <ClockCircleOutlined />
      case 2:
        return <SyncOutlined spin />
      case 3:
        return <CheckCircleOutlined />
      case 4:
        return <CheckCircleOutlined />
      case 5:
        return <CheckCircleOutlined />
      default:
        return <MinusCircleOutlined />
    }
  }

  const getStatusText = (status: number) => {
    switch (status) {
      case 1:
        return '접수 대기'
      case 2:
        return '조리 중'
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

  const [expandedOrder, setExpandedOrder] = useState<Order | null>(null)

  const toggleExpandedOrder = (order: Order) => {
    if (expandedOrder && expandedOrder._id === order._id) {
      setExpandedOrder(null)
    } else {
      setExpandedOrder(order)
    }
  }

  const renderExpandedContent = (order: Order) => {
    return (
      <ExpandedOrderContainer>
        <div>
          {Object.values(order.menus).map((menu) => (
            <div key={menu.menu_name}>
              <div>
                {menu.menu_name} - {menu.quantity}개
              </div>
            </div>
          ))}
        </div>
      </ExpandedOrderContainer>
    )
  }

  const OrderList = (data: Order[] | undefined) => {
    console.log(data)
    return (
      <List
        itemLayout="horizontal"
        dataSource={data}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              title={
                <StyledSpace>
                  <div>
                    <StyledTag color={getStatusColor(item.status)} icon={getStatusIcon(item.status)}>
                      {getStatusText(item.status)}
                    </StyledTag>
                    {item.table_id}번 테이블
                  </div>
                </StyledSpace>
              }
              description={
                <div>
                  <div>{getTimeDiff(dayjs(item.created_at))}</div>
                  <StyledMenuContainer>
                    <span onClick={() => toggleExpandedOrder(item)}>
                      {expandedOrder && expandedOrder._id === item._id ? (
                        <ChevronD width="2rem" height="2rem" fill="#212121" />
                      ) : (
                        <ChevronR width="2rem" height="2rem" fill="#212121" />
                      )}
                    </span>
                    {Object.values(item.menus).length === 1
                      ? Object.values(item.menus)[0].menu_name
                      : `${Object.values(item.menus)[0].menu_name} 외 ${Object.values(item.menus).length - 1}개`}
                  </StyledMenuContainer>
                  {expandedOrder && expandedOrder._id === item._id && renderExpandedContent(item)}
                </div>
              }
            />
            <div>
              <StyledButton type="primary" onClick={() => changeStatus(item)} disabled={item.status > 2 ? true : false}>
                {getStatusButtonText(item.status)}
              </StyledButton>
            </div>
          </List.Item>
        )}
      />
    )
  }
  const WaitingAcceptData = data?.filter((order) => order.status == 1)
  const OnProcessingData = data?.filter((order) => order.status == 2)
  const CompletedData = data
    ?.filter((order) => order.status >= 3)
    .sort((a, b) => {
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    })
  const items: TabsProps['items'] = [
    {
      key: '1',
      label: getStatusText(1),
      children: OrderList(WaitingAcceptData),
    },
    {
      key: '2',
      label: getStatusText(2),
      children: OrderList(OnProcessingData),
    },
    {
      key: '3',
      label: getStatusText(3),
      children: OrderList(CompletedData),
    },
  ]

  useEffect(() => {
    onOrder(id, (event) => {
      const newOrder = event.content as Order
      queryClient.setQueriesData('orderList', (oldData: any) => (newOrder ? [...oldData, newOrder] : oldData))
    })
  })

  if (isLoading) return <Loading />

  if (isError) return <ErrorPage errorCode={500} />

  return (
    <StyledContainer>
      <div></div>
      {isFetching ? <Loading /> : <Tabs defaultActiveKey="1" items={items} />}
    </StyledContainer>
  )
}

export default RestaurantOrderList

const StyledContainer = styled.div`
  padding: 1rem;
`

const StyledSpace = styled(Space)`
  width: 100%;
  justify-content: space-between;
  align-items: center;
  margin: 0;
  font-weight: lighter;
`

const StyledTag = styled(Tag)`
  padding: 0.5rem;
  margin-right: 2rem;
  font-weight: bold;
`

const StyledButton = styled(Button)`
  height: 100%;
  padding: 1rem;
  aspect-ratio: 1;
`

const ExpandedOrderContainer = styled.div`
  padding: 1rem;
  background-color: ${({ theme }) => theme.COLOR.common.gray[120]};
  margin-right: 2rem;
`
const StyledMenuContainer = styled.div`
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.COLOR.common.black[0]};
  :hover {
    color: ${({ theme }) => theme.COLOR.common.gray[100]};
  }
  span {
    padding: 0 1rem 0 0;
    cursor: pointer;
    align-items: center;
    display: flex;
    justify-content: center;
  }
`
