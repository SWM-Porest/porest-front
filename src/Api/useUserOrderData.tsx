import axios from 'axios'
import { useQuery } from 'react-query'

// 사용자 데이터를 가져오는 함수
const fetchUserOrderData = async (page: number, pageSize: number, sort: number, accessToken: string) => {
  const response = await axios.get(
    `${process.env.REACT_APP_API_URL}/orders/user?page=${page}&pageSize=${pageSize}&sort=${sort}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  )

  return response.data
}

const useUserOrderData = (page: number, pageSize: number, sort: number, accessToken: string) => {
  return useQuery(['userData', page, pageSize, sort], () => fetchUserOrderData(page, pageSize, sort, accessToken), {
    staleTime: 60000,
    retry: 3,
    retryDelay: 1000,
    onError: (error) => {
      console.error('데이터 요청 에러:', error)
    },
  })
}

export default useUserOrderData
