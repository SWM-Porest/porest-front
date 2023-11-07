import { initializeApp } from 'firebase/app'
import { getMessaging, getToken } from 'firebase/messaging'

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: 'porest-1fe07.firebaseapp.com',
  projectId: 'porest-1fe07',
  storageBucket: 'porest-1fe07.appspot.com',
  messagingSenderId: '429274896579',
  appId: '1:429274896579:web:220fb3b054ac95125e2a76',
  measurementId: 'G-NWNSZKYZVP',
}

export function requestPermission() {
  void Notification.requestPermission().then((permission) => {
    if (permission === 'granted') {
      console.log('푸시 권한 허용')
    } else if (permission === 'denied') {
      console.log('푸시 권한 거부')
    }

    const firebaseApp = initializeApp(firebaseConfig)
    const messaging = getMessaging(firebaseApp)

    getToken(messaging, { vapidKey: process.env.REACT_APP_FIREBASE_VAPID_KEY })
      .then((token: string) => {
        if (token.length > 0) {
          console.log(`푸시 토큰 발급 완료 : ${token}`)
        } else {
          console.log('푸시 토큰 발급 실패')
        }
      })
      .catch((err) => {
        console.log('푸시 토큰 가져오는 중에 에러 발생')
      })
  })
}

requestPermission()
