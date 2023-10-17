import axios from 'axios'
import { FindWaitingDto } from './waitingRegistration'

const fetchWaitingCancel = async (accessToken: string, data: FindWaitingDto) => {
  try {
    const response = await axios({
      method: 'PATCH',
      url: `${process.env.REACT_APP_API_URL}/waitings/cancel`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      data: data,
    })
    return response.data
  } catch (error) {
    throw new Error()
  }
}

export default fetchWaitingCancel
