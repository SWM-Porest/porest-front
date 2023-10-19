import { useAccessToken } from 'Api/tokenCookie'
import { useEffect } from 'react'
import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom'
function PrivateRoute() {
  const [accessToken, setAccessToken] = useAccessToken()
  const navigate = useNavigate()
  const { pathname } = useLocation()

  useEffect(() => {
    if (!accessToken) {
      navigate('/login', {
        state: {
          from: pathname,
        },
      })
    }
  }, [])

  return accessToken ? <Outlet /> : <Navigate to={'/login'} />
}

export default PrivateRoute
