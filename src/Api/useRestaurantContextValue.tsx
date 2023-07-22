import { Restaurant, RestaurantContext, restaurantContextDefaultValue } from 'Context/restaurant_context'
import axios from 'axios'
import { useCallback, useContext, useEffect, useState } from 'react'

export const useRestaurantContextValue = () => {
  const [restaurant, setRestaurant] = useState<Restaurant>(restaurantContextDefaultValue.restaurant)
  const [isLoading, setIsLoading] = useState(false)

  const getRestaurant = useCallback(
    async (id: string) => {
      setIsLoading(true)
      const res = await axios.get(`http://localhost:3001/restaurants/${id}`, {
        headers: { Authorization: 'Basic YWRtaW46c3dtMTRwb3Jlc3QhIQ==' },
      })
      setRestaurant(res.data)
    },
    [setRestaurant],
  )
  return {
    restaurant,
    isLoading,
    getRestaurant,
  }
}

export const useRestaurantLoading = () => {
  const { getRestaurant } = useContext(RestaurantContext)
  useEffect(() => {
    getRestaurant('64bb91af02ebdee472579f97')
  }, [getRestaurant])
}
