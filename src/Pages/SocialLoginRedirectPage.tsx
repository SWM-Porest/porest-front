import { useNavigate } from 'react-router-dom'

const SocialLoginRedirectPage = () => {
  const savedPath = localStorage.getItem('savedPath')
  const navigate = useNavigate()

  if (savedPath) {
    navigate(savedPath)
  }
}

export default SocialLoginRedirectPage
