import axios from 'axios'

export interface CreateWaitingDto {
  restaurant_id: string
  head_count: number
  token?: PushSubscription | null
}

export interface FindWaitingDto {
  _id: string
}

export interface Waiting {
  _id: string
  user_id: string
  user_nick: string
  restaurant_id: string
  restaurant_name: string
  status: number
  head_count: number
  created_at: Date
  updated_at: Date
}

export interface WaitingTeam {
  _id: string
  restaurant_id: string
  created_at: Date
  updated_at: Date
  waiting_teams: number
}

export const fetchWaitingRegistration = async (data: CreateWaitingDto, accessToken: string): Promise<Waiting> => {
  const waitingRegistration = async (pushSubscription: PushSubscription | null): Promise<Waiting> => {
    data['token'] = pushSubscription
    const response = await axios({
      method: 'POST',
      url: `${process.env.REACT_APP_API_URL}/waitings`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      data: data,
    })
    console.log(response)
    return response.data
  }

  try {
    const permission = await Notification.requestPermission()
    if (permission == 'denied') {
      return waitingRegistration(null)
    } else if (navigator.serviceWorker) {
      const registration = await navigator.serviceWorker.register('../service-worker.js', { scope: '/' })
      const subscribeOptions = {
        userVisibleOnly: true,
        applicationServerKey: process.env.REACT_APP_PUBLIC_VAPID_KEY,
      }
      const pushSubscription = await registration.pushManager.subscribe(subscribeOptions)
      return waitingRegistration(pushSubscription)
    } else {
      throw new Error()
    }
  } catch (error) {
    // console.log(error)
    throw new Error()
  }
}
