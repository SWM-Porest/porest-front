import { Restaurant } from 'Context/restaurantContext'
import axios from 'axios'
import { useEffect, useState } from 'react'

export const useRestaurantContextValue = (id: string) => {
  const [restaurant, setRestaurant] = useState<Restaurant>()

  useEffect(() => {
    const getRestaurant = async (id: string) => {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/restaurants/${id}`, {
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
