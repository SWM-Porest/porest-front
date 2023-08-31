import BurgerMenu from 'Component/BurgerMenu'
import { useAuth } from 'Context/AuthContext'
import Header from '../Component/Header'

const MyPage = () => {
  const { accessToken } = useAuth() // accessToken 사용 법!

  return (
    <div>
      <Header Left={<BurgerMenu />} HeaderName="마이 페이지" Right={''} />
    </div>
  )
}
export default MyPage
