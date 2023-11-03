import { io, Socket } from 'socket.io-client'

export const onOrder = (restaurant_id: string, callback: (data: any) => void) => {
  const socket: Socket = io(`${process.env.REACT_APP_API_URL}/orders`, { transports: ['websocket'] })

  if (socket.hasListeners(restaurant_id)) socket.off(restaurant_id)
  socket.on(restaurant_id, callback)
}
