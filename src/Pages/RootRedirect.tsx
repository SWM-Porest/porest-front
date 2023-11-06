import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const RootRedirect = () => {
  const navigate = useNavigate()
  useEffect(() => {
    navigate('/restaurants')
  }, [])
  return <div></div>
}

export default RootRedirect
