import axios, { AxiosError } from 'axios'
import React, { Dispatch, createContext, useContext, useReducer } from 'react'

export interface Restaurant {
  _id: string
  name: string
  en_name: string
  category: string[]
  intro: string
  notice: string
  phone_number: string
  banner_image_urls: string[]
  address: string
  created_at: string
  updated_at: string
  status: number
  menus: Menu[]
}

export interface Menu {
  name: string
  en_name: string
  menutype: string
  price: number
  category: string
  description: string
  img: string
  ingre: string[]
  _id: string
}

export const restaurantContextDefaultValue: Restaurant = {
  _id: '',
  name: '',
  en_name: '',
  category: [],
  banner_image_urls: [],
  intro: '',
  notice: '',
  phone_number: '',
  address: '',
  created_at: '',
  updated_at: '',
  status: 1,
  menus: [
    {
      _id: '',
      name: '',
      en_name: 'string',
      menutype: 'string',
      price: 2000,
      category: 'string',
      description: 'string',
      img: 'string',
      ingre: ['string'],
    },
  ],
}

interface RestaurantStateT {
  restaurant: {
    loading: boolean
    error: null | AxiosError
    data: null | Restaurant
  }
}

type RestaurantActionT =
  | { type: 'GET_RESTAURANT' }
  | { type: 'GET_RESTAURANT_SUCCESS'; data: Restaurant }
  | { type: 'GET_RESTAURANT_FAILURE'; error: AxiosError }

const initialState = {
  restaurant: {
    loading: false,
    error: null,
    data: null,
  },
}

const restauarntReducer = (state: RestaurantStateT, action: RestaurantActionT): RestaurantStateT => {
  switch (action.type) {
    case 'GET_RESTAURANT':
      return {
        ...state,
        restaurant: {
          ...state.restaurant,
          loading: true,
        },
      }
    case 'GET_RESTAURANT_SUCCESS':
      return {
        ...state,
        restaurant: {
          ...state.restaurant,
          data: action.data,
          loading: false,
        },
      }
    case 'GET_RESTAURANT_FAILURE':
      return {
        ...state,
        restaurant: {
          ...state.restaurant,
          error: action.error,
          loading: false,
        },
      }
    default:
      throw new Error('invalid action type')
  }
}

export const RestaurantStateContext = createContext<null | RestaurantStateT>(null)
const RestaurantDispatchContext = createContext<null | Dispatch<RestaurantActionT>>(null)

export const RestaurantProvider = ({ children }: { children: React.ReactNode }) => {
  const [restaurantState, restaurantDispatch] = useReducer(restauarntReducer, initialState)

  return (
    <RestaurantStateContext.Provider value={restaurantState}>
      <RestaurantDispatchContext.Provider value={restaurantDispatch}>{children}</RestaurantDispatchContext.Provider>
    </RestaurantStateContext.Provider>
  )
}

export const useRestaurantState = () => {
  const restaurantState = useContext(RestaurantStateContext)
  if (!restaurantState) throw new Error('Can not find restaurantStateProvider')
  return restaurantState
}

export const useRestauranDispatch = () => {
  const restaurantDispatch = useContext(RestaurantDispatchContext)
  if (!restaurantDispatch) throw new Error('Can not find restaurantDispatchProvider')
  return restaurantDispatch
}

export const getRestaurant = async (dispatch: React.Dispatch<RestaurantActionT>, id: string) => {
  dispatch({ type: 'GET_RESTAURANT' })
  try {
    const response = await axios.get<Restaurant>(`${process.env.REACT_APP_API_URL}/restaurants/${id}`)
    dispatch({ type: 'GET_RESTAURANT_SUCCESS', data: response.data })
  } catch (e) {
    if (axios.isAxiosError(e)) {
      dispatch({ type: 'GET_RESTAURANT_FAILURE', error: e })
    }
  }
}
