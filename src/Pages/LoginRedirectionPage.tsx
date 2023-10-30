import { Navigate, useNavigate } from 'react-router-dom'

const LoginRedirectionPage = () => {
  const navigate = useNavigate()
  const savedPath = localStorage.getItem('savedPath')
  return <div>{savedPath && <Navigate to={savedPath}></Navigate>}</div>
}

export default LoginRedirectionPage
