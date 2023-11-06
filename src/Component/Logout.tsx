import { logout } from 'Api/tokenCookie'
const Logout = () => {
  const handleLogout = () => {
    logout()
    window.location.href = '/restaurants'
  }

  return <button onClick={handleLogout}>로그아웃</button>
}

export default Logout
