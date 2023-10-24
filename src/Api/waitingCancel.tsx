import axios from 'axios'

const fetchWaitingCancel = async (accessToken: string, waitingId: string) => {
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

export default fetchWaitingCancel
