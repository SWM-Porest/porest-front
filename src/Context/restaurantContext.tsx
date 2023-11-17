import { MenuOption } from 'Api/OrderInterface'
import axios, { AxiosError } from 'axios'
import React, { Dispatch, createContext, useContext, useReducer } from 'react'

export const isInstanceOfImage = (object: any): boolean => {
  return typeof object === 'object' && object !== null && 'filename' in object && 'path' in object && 'type' in object
}

export interface Image {
  filename: string
  path: string
  type: string
}

export interface Restaurant {
  _id: string
  name: string
  en_name: string
  category: string[]
  intro: string
  notice: string
  phone_number: string
  banner_images: Image[]
  address: string
  created_at: string
  updated_at: string
  status: number
  menus: Menu[]
}

export interface Menu {
  name: string
  en_name: string
  price: number
  category: string
  description: string
  img: Image
  ingre: string[]
  _id: string
  isSoldOut: boolean
  menuOptions: MenuOption[]
}

export const restaurantContextDefaultValue: Restaurant = {
  _id: '',
  name: '',
  en_name: '',
  category: [],
  banner_images: [],
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
      isSoldOut: false,
      price: 2000,
      category: 'string',
      description: 'string',
      img: {
        filename: 'string',
        path: 'string',
        type: 'string',
      },
      ingre: ['string'],
      menuOptions: [
        {
          _id: '',
          name: 'string',
          isSoldOut: false,
          maxSelect: 1,
          isRequired: false,
          items: [
            {
              name: 'string',
              price: 2000,
            },
          ],
        },
      ],
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
          error: null, // 요청 시작 시 에러 초기화
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

export const useRestaurantDispatch = () => {
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
