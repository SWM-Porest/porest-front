import { CookiesProvider } from 'react-cookie'
import ReactDOM from 'react-dom/client'
import App from './App'
import axios from 'axios'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <CookiesProvider>
    <App />
  </CookiesProvider>,
)

axios.defaults.withCredentials = true
