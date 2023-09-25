import { OrderMenu } from 'Component/ProfileComponent/OrderList'
import axios from 'axios'

export interface Order {
  _id: string
  restaurant_id: string
  restaurant_name: string
  restaurant_address: string
  user_id: string
  table_id: number
  menus: { [menuId: string]: OrderMenu }
  status: number
  status_updated_at: { [key: number]: Date }
  token: string | null
  created_at: string
  updated_at: string
}

export interface PushSubscription {
  endpoint: string
  keys: {
    auth: string
    p256dh: string
  }
  expirationTime: number | null
}

export interface CreateOrder {
  restaurant_id: string
  restaurant_name: string
  restaurant_address: string
  table_id: number
  menus: { [menuId: string]: OrderMenu }
  token: string | null
}
export const createOrder = async (order: CreateOrder, accessToken: string): Promise<Order> => {
  const { data } = await axios<Order>({
    method: 'POST',
    url: `${process.env.REACT_APP_API_URL}/orders`,
    data: order,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })

  return data
}
// 아래와 같이 사용.
// const { mutate, isLoading, isError, error, isSuccess } = useMutation((order: CreateOrder) =>
//   createOrder(order, accessToken),
// )
