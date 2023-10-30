export const useNotification = async (accessToken: string, restaurant: any, table: any, cookie: any) => {
  Notification.requestPermission().then((permission) => {
    if (permission == 'denied') {
      alert('알림이 거부되었습니다.')
    } else if (navigator.serviceWorker) {
      navigator.serviceWorker
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
              restaurant_id: restaurant?._id,
              restaurant_name: restaurant?.name,
              restaurant_address: restaurant?.address,
              //테이블 아이디 어디서 받아야할지 모르겠음
              table_id: table,
              menus: cookie,
              token: pushSubscription,
            }),
          })
        })
    }
  })
}
