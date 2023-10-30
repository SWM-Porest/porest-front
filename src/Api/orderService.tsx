import axios from 'axios'
import { Order } from './OrderInterface'

const api = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/orders`,
})

export const orderService = {
  getOrders: async (id: string, access_token: string): Promise<Order[]> => {
    const response = await api.get(`/restaurant/${id}`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    })

    return response.data
  },

  changeStatus: async (id: string, access_token: string, status: number): Promise<Order> => {
    return await api.patch(`/${id}`, null, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
      params: {
        s: status,
      },
    })
  },
}
