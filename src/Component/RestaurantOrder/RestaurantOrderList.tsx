import { orderService } from 'Api/orderService'
import { useAccessToken } from 'Api/tokenCookie'
import Loading from 'Component/Loading'
import { Order } from 'Component/ProfileComponent/OrderList'
import ErrorPage from 'Pages/ErrorPage'
import { Button, List, Space, Tabs, TabsProps, Tag, message } from 'antd'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { useParams } from 'react-router-dom'
import { styled } from 'styled-components'
import { CheckCircleOutlined, ClockCircleOutlined, MinusCircleOutlined, SyncOutlined } from '@ant-design/icons'
import { onOrder } from 'Socket/socketio'
import { useEffect } from 'react'

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

  // 최신순으로 정렬
  // data?.sort((a, b) => {
  //   return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  // })

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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    function pad(n: number) {
      return n < 10 ? '0' + n : n
    }
    return `${date.getFullYear()}.${pad(date.getMonth() + 1)}.${pad(date.getDate())} ${pad(date.getHours())}:${pad(
      date.getMinutes(),
    )}:${pad(date.getSeconds())}`
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
  const OrderList = (data: Order[] | undefined) => {
    return (
      <List
        itemLayout="vertical"
        dataSource={data}
        renderItem={(item) => (
          <List.Item
            actions={[
              <Button type="primary" onClick={() => changeStatus(item)} disabled={item.status > 2 ? true : false}>
                {getStatusButtonText(item.status)}
              </Button>,
            ]}
          >
            <List.Item.Meta
              title={
                <Space>
                  <Tag color={getStatusColor(item.status)} icon={getStatusIcon(item.status)}>
                    {getStatusText(item.status)}
                  </Tag>
                  {item.menus[0].menu_name} 외 {Object.values(item.menus).length - 1}개
                </Space>
              }
              description={formatDate(item.created_at.toString())}
            ></List.Item.Meta>

            <List
              itemLayout="horizontal"
              dataSource={item.menus}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta title={item.menu_name} description={item.quantity + '개'} />
                </List.Item>
              )}
            ></List>
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
  padding: 48pt;
  font-size: 2rem;
  * {
    font-size: inherit !important;
  }
  button {
    height: fit-content !important;
  }
`
