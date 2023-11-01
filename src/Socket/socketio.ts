import { io, Socket } from 'socket.io-client'

export const socket: Socket = io(`${process.env.REACT_APP_API_URL}/orders`)

export const onOrder = (restaurant_id: string, callback: (data: any) => void) => {
  if (socket.hasListeners(restaurant_id)) socket.off(restaurant_id)
  socket.on(restaurant_id, callback)
}
