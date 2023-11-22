import { ChevronLeft20Filled } from '@fluentui/react-icons'
import { getWaiting, getWaitingTeam } from 'Api/getWaiting'
import { useAccessToken } from 'Api/tokenCookie'
import { fetchWaitingCancel } from 'Api/updateWaiting'
import { Waiting } from 'Api/waitingRegistration'
import Header from 'Component/Header'
import { FullPageDiv, RotateButton, Step1, Step2, Step3 } from 'Component/WaitingComponent/HeadCountForm'
import { getRestaurant, useRestaurantDispatch, useRestaurantState } from 'Context/restaurantContext'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { StyledSpin } from './MenuBoardPage'
import { getMessaging, getToken } from 'firebase/messaging'

enum StepNumber {
  SelectHeadCounter = 1,
  RegisterWaiting = 2,
  WaitingData = 3,
}

const WaitingPage = () => {
  const { restaurant_id } = useParams<{ restaurant_id: string }>()
  const defaultId = restaurant_id || ''
  const [data, setData] = useState({ head_count: 2, restaurant_id: defaultId })
  const [stepNumber, setStepNumber] = useState(StepNumber.SelectHeadCounter)
  const [apiLoading, setApiLoading] = useState(false)
  const headerNames = ['', '방문 인원 선택하기', '웨이팅 등록하기', '현재 대기 정보']
  const pushToken = localStorage.getItem('pushToken')
  const [accessToken] = useAccessToken()
  const dispatch = useRestaurantDispatch()
  const { data: restaurant, loading } = useRestaurantState().restaurant
  const { data: waiting, isLoading } = getWaiting(data.restaurant_id, accessToken)
  const { data: waitingTeam, isLoading: isLoading2 } = getWaitingTeam(data.restaurant_id, accessToken)

  useEffect(() => {
    getRestaurant(dispatch, defaultId)
  }, [dispatch, defaultId])

  const nextPage = (formData: any) => {
    setStepNumber(stepNumber + 1)
    setData({ ...data, ...formData })
  }

  const prevPage = () => {
    setStepNumber(stepNumber - 1)
  }

  const onSubmit = async () => {
    setApiLoading(true)
    const waitingRegistration = async (pushSubscription: string | null): Promise<Waiting> => {
      const body = { ...data, token: pushSubscription }
      const response = await axios({
        method: 'POST',
        url: `${process.env.REACT_APP_API_URL}/waitings`,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        data: body,
      })
      return response.data
    }
    try {
      waitingRegistration(pushToken)
      window.location.reload()
    } catch (error) {
      // 오류 처리 로직 추가
      console.error('오류 발생:', error)
    }
  }

  const cancelWaiting = async (waitingId: string) => {
    try {
      const isConfirmed = confirm('정말 취소하시겠어요?')

      if (isConfirmed) {
        await fetchWaitingCancel(accessToken, waitingId)
        setData({ head_count: 2, restaurant_id: defaultId })
        setStepNumber(StepNumber.SelectHeadCounter)
        window.location.reload()
      } else {
        // console.log('취소 안함')
      }
    } catch (err) {
      alert('취소 중 오류가 발생했습니다.')
      window.location.reload()
    }
  }

  if (!(!loading && !isLoading && !isLoading2)) {
    return (
      <StyledSpin tip="Loading" size="large">
        <div className="content" />
      </StyledSpin>
    )
  }

  if (waiting && waiting.status < 3 && waitingTeam && stepNumber !== StepNumber.WaitingData) {
    setData({ ...waiting })
    setStepNumber(StepNumber.WaitingData)
  }

  return (
    <FullPageDiv>
      <Header
        Left={stepNumber === StepNumber.RegisterWaiting && <ChevronLeft20Filled color="#212121" onClick={prevPage} />}
        HeaderName={headerNames[stepNumber]}
        Right={stepNumber === StepNumber.WaitingData && <RotateButton />}
      />
      {stepNumber === StepNumber.SelectHeadCounter && <Step1 nextPage={nextPage} data={data} />}
      {stepNumber === StepNumber.RegisterWaiting && (
        <Step2
          data={data}
          restaurant={restaurant}
          team={waitingTeam.waiting_teams}
          onSubmit={onSubmit}
          apiLoading={apiLoading}
        />
      )}
      {stepNumber === StepNumber.WaitingData && (
        <Step3 data={data} cancel={cancelWaiting} team={waitingTeam.waiting_teams} accessToken={accessToken} />
      )}
    </FullPageDiv>
  )
}

export default WaitingPage
