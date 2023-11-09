import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import LoginPage from './LoginPage'
import { useAccessToken } from 'Api/tokenCookie'

const LoginRedirectionPage = () => {
  const navigate = useNavigate()
  const savedPath = localStorage.getItem('savedPath') || '/restaurants'
  const [accessToken] = useAccessToken()

  useEffect(() => {
    if (accessToken) {
      navigate(savedPath)
    }
  }, [])

  return <LoginPage />
}

export default LoginRedirectionPage
