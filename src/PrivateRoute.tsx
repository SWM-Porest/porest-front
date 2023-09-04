// PrivateRoute.tsx
import { useAuth } from 'Context/AuthContext'
import React from 'react'
import { Navigate } from 'react-router-dom'

const PrivateRoute: React.FC<{ path: string; element: React.ReactNode }> = ({ path, element }) => {
  const { accessToken } = useAuth()

  if (!accessToken) {
    // 인증되지 않은 경우 로그인 페이지로 리디렉션
    return <Navigate to="/login" replace />
  }

  // 인증된 경우 래핑된 컴포넌트를 반환
  return <>{element}</>
}

export default PrivateRoute
