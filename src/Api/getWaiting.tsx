import axios from 'axios'
import { Waiting, WaitingTeam } from './waitingRegistration'
import { useQuery } from 'react-query'

const fetchgetWaiting = async (id: string, accessToken: string): Promise<Waiting | undefined> => {
  try {
    const response = await axios({
      method: 'GET',
      url: `${process.env.REACT_APP_API_URL}/waitings/${id}`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    return response.data
  } catch (error) {
    // console.log('웨이팅 정보가 없습니다.')
  }
}

export const fetchgetRestaurantWaiting = async (id: string, accessToken: string): Promise<Waiting[]> => {
  try {
    const response = await axios({
      method: 'GET',
      url: `${process.env.REACT_APP_API_URL}/waitings/${id}/restaurant`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    return response.data
  } catch (error) {
    throw new Error()
  }
}

export const fetchWaitingTeam = async (id: string, accessToken: string): Promise<WaitingTeam | undefined> => {
  try {
    const response = await axios({
      method: 'GET',
      url: `${process.env.REACT_APP_API_URL}/waitings/${id}/team`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    return response.data
  } catch (error) {
    // console.log('현재 대기 팀 수가 없습니다.')
  }
}

export const getWaiting = (restaurant_id: string, accessToken: string): any => {
  try {
    return useQuery(['waiting', restaurant_id], () => fetchgetWaiting(restaurant_id, accessToken), {
      staleTime: 60000,
      retry: 0,
    })
  } catch (err) {
    // console.log('웨이팅 정보가 없습니다.')
  }
}

export const getWaitingTeam = (restaurant_id: string, accessToken: string): any => {
  try {
    return useQuery(['waitingTeam', restaurant_id], () => fetchWaitingTeam(restaurant_id, accessToken), {
      staleTime: 60000,
      retry: 0,
    })
  } catch (err) {
    // console.log('현재 대기 팀 수가 없습니다.')
  }
}
