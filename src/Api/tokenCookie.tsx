import axios from 'axios'
import { useQuery } from 'react-query'
import { atom, useRecoilState } from 'recoil'

export const getCookie = (name: string) => {
  const cookies = document.cookie.split(';')
  for (const cookie of cookies) {
    const [cookieName, cookieValue] = cookie.trim().split('=')
    if (cookieName.trim() === name) {
      return decodeURIComponent(cookieValue)
    }
  }
  return undefined
}

export const fetchGetRefreshToken = async () => {
  try {
    const refreshToken = await axios({
      method: 'GET',
      url: `${process.env.REACT_APP_API_URL}/auth/getrefreshtoken`,
      headers: {
        Authorization: `Bearer ${getCookie('refresh_token')}`,
      },
    })

    return refreshToken.data
  } catch (err) {
    throw new Error()
  }
}

export const accessTokenState = atom({
  key: 'accessTokenState',
  default: getCookie('access_token') || '',
})

export const useAccessToken = () => {
  return useRecoilState(accessTokenState)
}

export const getRefreshToken = () => {
  try {
    return useQuery(['refreshToken'], () => fetchGetRefreshToken(), {
      staleTime: 60000,
      retry: 0,
    })
  } catch (err) {
    // console.log(err)
  }
}
export const logout = async () => {
  await axios({
    method: 'POST',
    url: `${process.env.REACT_APP_API_URL}/auth/logout`,
    headers: {
      Authorization: `Bearer ${getCookie('access_token')}`,
    },
  }).catch((err) => {
    // console.log(err)
  })
}
