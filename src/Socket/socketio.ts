import { io, Socket } from 'socket.io-client'
let socket: Socket

export const connect = () => {
  socket = io(`${process.env.REACT_APP_API_URL}/orders`, { transports: ['websocket'] })
}
export const onOrder = (restaurant_id: string, callback: (data: any) => void) => {
  if (!socket) return
  if (socket.hasListeners(restaurant_id)) socket.off(restaurant_id)
  socket.on(restaurant_id, callback)
}

export const disconnect = () => {
  socket.disconnect()
}
