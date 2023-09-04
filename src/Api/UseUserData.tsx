import axios from 'axios'
import { useQuery } from 'react-query'

// 사용자 데이터를 가져오는 함수
const fetchUserData = async (userId: string, page: number, pageSize: number, sort: string, accessToken: string) => {
  const response = await axios.get(
    `${process.env.REACT_APP_API_URL}/order/user/${userId}?page=${page}&pageSize=${pageSize}&sort=${sort}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  )

  return response.data
}

// 사용자 데이터를 가져오는 React Query 훅을 사용
const useUserData = (userId: string, page: number, pageSize: number, sort: string, accessToken: string) => {
  return useQuery(
    ['userData', userId, page, pageSize, sort],
    () => fetchUserData(userId, page, pageSize, sort, accessToken),
    {
      // 캐싱 설정: 데이터를 캐싱하여 중복 요청을 방지
      staleTime: 60000,
      // 자동 재요청 설정: 일시적인 네트워크 에러에 대비하여 자동 재요청을 활성화
      retry: 3,
      retryDelay: 1000,
      onError: (error) => {
        // 에러 핸들링: 요청 중 발생한 에러를 처리
        console.error('데이터 요청 에러:', error)
      },
    },
  )
}

export default useUserData
