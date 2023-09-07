import { getCookie } from 'Api/tokenCookie'
import { createContext, useContext, useEffect, useState } from 'react'

// Context 생성
const AuthContext = createContext({
  accessToken: '',
})

// Provider 컴포넌트 생성
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [accessToken, setAccessToken] = useState('')

  // 컴포넌트가 마운트될 때 쿠키에서 토큰 추출
  useEffect(() => {
    async function fetchTokens() {
      try {
        const storedAccessToken = getCookie('access_token')

        if (storedAccessToken) {
          setAccessToken(storedAccessToken)
        }
      } catch (error) {
        console.error('쿠키 읽기 오류:', error)
      }
    }

    fetchTokens() // 비동기 함수 호출
  }, [])

  return <AuthContext.Provider value={{ accessToken }}>{children}</AuthContext.Provider>
}

// 토큰 정보를 사용하는 커스텀 훅 생성
export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth는 AuthProvider 내에서 사용해야 함')
  }
  return context
}
