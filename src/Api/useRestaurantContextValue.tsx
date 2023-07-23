import { Restaurant, RestaurantContext, restaurantContextDefaultValue } from 'Context/restaurant_context'
import axios from 'axios'
import { useCallback, useContext, useEffect, useMemo, useState } from 'react'

export const useRestaurantContextValue = (id: string) => {
  const [restaurant, setRestaurant] = useState<Restaurant>(restaurantContextDefaultValue.restaurant)

  useEffect(() => {
    const getRestaurant = (id: string) => {
      axios
        .get(`http://localhost:3001/restaurants/${id}`, {
          headers: { Authorization: 'Basic YWRtaW46c3dtMTRwb3Jlc3QhIQ==' },
        })
        .then((response) => {
          console.log(response.data, 'axios response')
          setRestaurant(response.data)
          console.log(restaurant, 'axios setRestaurant')
        })
    }
    getRestaurant(id)
  }, [])

  return { restaurant }
}

export const useRestaurantLoading = () => {
  useEffect(() => {
    useRestaurantContextValue('64bb91af02ebdee472579f97')
  }, [])
}
