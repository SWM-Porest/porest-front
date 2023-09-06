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

export const accessTokenState = atom({
  key: 'accessTokenState',
  default: getCookie('access_token') || '',
})

export const useAccessToken = () => {
  return useRecoilState(accessTokenState)
}
