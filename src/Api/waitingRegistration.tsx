import axios from 'axios'

export interface CreateWaitingDto {
  restaurant_id: string
  head_count: number
}

export interface FindWaitingDto {
  _id: string
}

export interface Waiting {
  _id: string
  user_id: string
  restaurant_id: string
  restaurant_name: string
  status: number
  head_count: number
  created_at: Date
  updated_at: Date
}

const fetchWaitingRegistration = async (data: CreateWaitingDto, accessToken: string): Promise<Waiting> => {
  try {
    const response = await axios({
      method: 'POST',
      url: `${process.env.REACT_APP_API_URL}/waitings`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      data: data,
    })

    return response.data
  } catch (error) {
    console.log(error)
    throw new Error()
  }
}

export default fetchWaitingRegistration
