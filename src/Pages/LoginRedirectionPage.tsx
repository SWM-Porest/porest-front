import { useEffect } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'

const LoginRedirectionPage = () => {
  const navigate = useNavigate()
  const savedPath = localStorage.getItem('savedPath') || '/restaurants'
  console.log(savedPath)
  useEffect(() => {
    navigate(savedPath)
  }, [])
  return <div>{savedPath || <Navigate to={'/restaurants'}></Navigate>}</div>
}

export default LoginRedirectionPage
