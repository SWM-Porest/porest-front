import axios from 'axios'
import { useQuery } from 'react-query'

// 사용자 데이터를 가져오는 함수를 정의합니다.
const fetchUserData = async (userId: string, page: number, pageSize: number, sort: string, accessToken: string) => {
  const response = await axios.get(
    `${process.env.REACT_APP_API_URL}/order/user/${userId}?page=${page}&pageSize=${pageSize}&sort=${sort}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`, // accessToken을 헤더에 추가합니다.
      },
    },
  )

  return response.data
}

// 사용자 데이터를 가져오는 React Query 훅을 사용합니다.
const useUserData = (userId: string, page: number, pageSize: number, sort: string, accessToken: string) => {
  return useQuery(['userData', userId, page, pageSize, sort], () =>
    fetchUserData(userId, page, pageSize, sort, accessToken),
  )
}

export default useUserData
