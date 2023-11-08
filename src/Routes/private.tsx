import { useAccessToken } from 'Api/tokenCookie'
import axios from 'axios'
import { useEffect } from 'react'
import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom'
function PrivateRoute() {
  const [accessToken] = useAccessToken()
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
            window.location.reload()
          } catch (error) {
            // console.log(error)
            navigate('/login')
          }
        }
        refreshAccessToken()
        navigate('/login/redirection')
      } catch (err) {
        // console.log(err)
      }
    }
  }, [])

  return accessToken ? <Outlet /> : <Navigate to={'/restaurants'} />
}

export default PrivateRoute
