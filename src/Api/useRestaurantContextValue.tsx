import { Restaurant, restaurantContextDefaultValue } from 'Context/restaurantContext'
import axios from 'axios'
import { useEffect, useLayoutEffect, useState } from 'react'

export const useRestaurantContextValue = (id: string) => {
  const [restaurant, setRestaurant] = useState<Restaurant>()

  useEffect(() => {
    const getRestaurant = async (id: string) => {
      const res = await axios.get(`http://localhost:3001/restaurants/${id}`, {
        headers: { Authorization: 'Basic YWRtaW46c3dtMTRwb3Jlc3QhIQ==' },
      })
      console.log(res.data, 'axios response')
      setRestaurant(res.data)
      // axios
      //   .get(`http://localhost:3001/restaurants/${id}`, {
      //     headers: { Authorization: 'Basic YWRtaW46c3dtMTRwb3Jlc3QhIQ==' },
      //   })
      //   .then((response) => {
      //     console.log(response.data, 'axios response')
      //     setRestaurant(response.data)
      //   })
    }
    getRestaurant(id)
  }, [setRestaurant])

  return { restaurant }
}

export const useRestaurantLoading = () => {
  useEffect(() => {
    useRestaurantContextValue('64bb91af02ebdee472579f97')
  }, [])
}
