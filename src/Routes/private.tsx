import { useAccessToken } from 'Api/tokenCookie'
import axios from 'axios'
import { useEffect } from 'react'
import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom'
function PrivateRoute() {
  const [accessToken, setAccessToken] = useAccessToken()
  const navigate = useNavigate()
  const { pathname } = useLocation()

  useEffect(() => {
    if (!accessToken) {
      try {
        localStorage.setItem('savedPath', pathname)
        const refreshAccessToken = async () => {
          try {
            await axios(`${process.env.REACT_APP_API_URL}/auth/refresh-accesstoken`, {
              method: 'GET',
            })
          } catch (error) {
            navigate('/login')
          }
        }
        refreshAccessToken()
        navigate(pathname)
        window.location.reload()
      } catch (err) {
        console.log(err)
      }
    }
  }, [])

  return accessToken ? <Outlet /> : <Navigate to={'/login'} />
}

export default PrivateRoute
