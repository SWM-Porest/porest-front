import axios from 'axios'

export const fetchWaitingCancel = async (accessToken: string, waitingId: string) => {
  try {
    const response = await axios({
      method: 'PATCH',
      url: `${process.env.REACT_APP_API_URL}/waitings/${waitingId}/cancel`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    return response.data
  } catch (error) {
    throw new Error()
  }
}

export const fetchWaitingManagerCancel = async (accessToken: string, waitingId: string) => {
  try {
    const response = await axios({
      method: 'PATCH',
      url: `${process.env.REACT_APP_API_URL}/waitings/${waitingId}/managercancel`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    return response.data
  } catch (error) {
    throw new Error()
  }
}

export const fetchWaitingCall = async (accessToken: string, waitingId: string) => {
  try {
    const response = await axios({
      method: 'PATCH',
      url: `${process.env.REACT_APP_API_URL}/waitings/${waitingId}/call`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    return response.data
  } catch (error) {
    throw new Error()
  }
}

export const fetchWaitingSeated = async (accessToken: string, waitingId: string) => {
  try {
    const response = await axios({
      method: 'PATCH',
      url: `${process.env.REACT_APP_API_URL}/waitings/${waitingId}/seated`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    return response.data
  } catch (error) {
    throw new Error()
  }
}
