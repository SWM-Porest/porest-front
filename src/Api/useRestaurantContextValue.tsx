import { Restaurant } from 'Context/restaurantContext'
import axios from 'axios'
import { useEffect, useState } from 'react'

export const useRestaurantContextValue = (id: string) => {
  const [restaurant, setRestaurant] = useState<Restaurant>()
  const apiUrl = process.env.NODE_ENV === 'production' ? 'api.pocketrestaurant.net' : 'http://localhost:3001' // 개발 환경의 경우 로컬 API 서버 주소

  useEffect(() => {
    const getRestaurant = async (id: string) => {
      const res = await axios.get(`${apiUrl}/restaurants/${id}`, {
        headers: { Authorization: 'Basic YWRtaW46c3dtMTRwb3Jlc3QhIQ==' },
      })
      setRestaurant(res.data)
    }
    getRestaurant(id)
  }, [setRestaurant])

  return { restaurant }
}

export const useRestaurantLoading = () => {
  useEffect(() => {
    useRestaurantContextValue('64be5622cdbb9385ac6851b9')
  }, [])
}
