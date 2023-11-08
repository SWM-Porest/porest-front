import { CookiesProvider } from 'react-cookie'
import ReactDOM from 'react-dom/client'
import App from './App'
import * as serviceWorkerRegistration from './serviceWorkerRegistration'
import axios from 'axios'
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: 'porest-1fe07.firebaseapp.com',
  projectId: 'porest-1fe07',
  storageBucket: 'porest-1fe07.appspot.com',
  messagingSenderId: '429274896579',
  appId: '1:429274896579:web:220fb3b054ac95125e2a76',
  measurementId: 'G-NWNSZKYZVP',
}

const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <CookiesProvider>
    <App />
  </CookiesProvider>,
)

serviceWorkerRegistration.register()
axios.defaults.withCredentials = true
