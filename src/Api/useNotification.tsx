import { CreateOrder, createOrder } from './createOrder'

export const useNotification = async (order: CreateOrder, accessToken: string) => {
  Notification.requestPermission().then(async (permission) => {
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
        .then(async (pushSubscription) => {
          await fetch(`${process.env.REACT_APP_API_URL}/orders`, {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${accessToken}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              ...order,
              token: pushSubscription,
            }),
          })
        })
      return data
    }
  })
}
