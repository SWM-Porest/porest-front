import { CreateOrder, createOrder } from './createOrder'

export const useNotification = async (order: CreateOrder, accessToken: string) => {
  await Notification.requestPermission().then(async (permission) => {
    if (permission == 'denied') {
      return await createOrder(order, accessToken)
    } else if (navigator.serviceWorker) {
      const data = await navigator.serviceWorker
        .register('../service-worker.js', { scope: '/' })
        .then((registration) => {
          const subscribeOptions = {
            userVisibleOnly: true,
            applicationServerKey: process.env.REACT_APP_PUBLIC_VAPID_KEY,
          }
          return registration.pushManager.subscribe(subscribeOptions)
        })
        .then((pushSubscription) => {
          order.token = JSON.stringify(pushSubscription)
          return createOrder(order, accessToken)
        })
      return data
    }
  })
}
