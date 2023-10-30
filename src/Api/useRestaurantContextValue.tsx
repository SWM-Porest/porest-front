import { Restaurant } from 'Context/restaurantContext'
import axios from 'axios'
import { useEffect, useState } from 'react'

export const useRestaurantContextValue = (id: string) => {
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null)
  useEffect(() => {
    const getRestaurant = async (id: string) => {
      try {
        const res = await axios.get<Restaurant>(`${process.env.REACT_APP_API_URL}/restaurants/${id}`)
        setRestaurant(res.data)
      } catch (e) {
        setRestaurant(null) // 에러 발생 시 레스토랑 데이터를 null로 설정
      }
    }
    getRestaurant(id)
  }, [id])

  return { restaurant }
}
