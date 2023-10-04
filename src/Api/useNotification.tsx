export const useNotification = () => {
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
        .then((pushSubscription) => {
          fetch('http://localhost:3001/orders/testNotify', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization:
                'Baerer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NGY1OGM5Y2U4OTIxYmYwNjNhYjViOTgiLCJ1c2VyTmljayI6Iuq5gO2YhOykkSIsInVzZXJsZXZlbCI6NTAsInJlc3RhdXJhbnRzSWQiOlsiNjRjNzAzMTQyM2ViMTE1YzM3NmQ2NDg4IiwiNjRjNzAzMTQyM2ViMTE1YzM3NmQ2NDg3IiwiNjBiOWIwYjllNmIzYjNhMGU0YjllMGEwIl0sInVzZXJUb2tlbiI6ImFjY2Vzc1Rva2VuIiwiaWF0IjoxNjk0Nzc5MDUyLCJleHAiOjE2OTUzODM4NTJ9.FR34P7TAkSaQhQN07ivA0uAVYPxazpDV9S2rzwM4bm8',
            },
            body: JSON.stringify(pushSubscription),
          })
        })
    }
  })
}
