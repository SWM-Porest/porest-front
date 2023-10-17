import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { getWaiting } from 'Api/getWaiting'
import { useAccessToken } from 'Api/tokenCookie'
import fetchWaitingCancel from 'Api/waitingCancel'
import fetchWaitingRegistration from 'Api/waitingRegistration'
import Header, { StyledNavbar } from 'Component/Header'
import { StyledButton } from 'Component/MenuComponent/AddCart'
import NowWaitingBox from 'Component/WaitingComponent/NowWaitingBox'
import { getRestaurant, useRestaurantDispatch, useRestaurantState } from 'Context/restaurantContext'
import { useEffect, useState } from 'react'
import { useMutation } from 'react-query'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { StyledSpin } from './MenuBoardPage'

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
  const headerNames = ['', '방문 인원 선택하기', '웨이팅 등록하기']
  const [accessToken] = useAccessToken()
  const { mutate } = useMutation(() => fetchWaitingRegistration(data, accessToken))
  const dispatch = useRestaurantDispatch()
  const { data: restaurant, loading, error } = useRestaurantState().restaurant

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
    try {
      mutate()
      setStepNumber(StepNumber.WaitingData)
      window.location.reload()
    } catch (err) {
      throw new Error()
    }
  }

  const cancelWaiting = async () => {
    try {
      await fetchWaitingCancel(accessToken, { _id: waiting._id })
      setStepNumber(StepNumber.SelectHeadCounter)
      window.location.reload()
    } catch (err) {
      throw new Error()
    }
  }

  const { data: waiting, isLoading } = getWaiting(data.restaurant_id, accessToken)

  if (isLoading || loading) {
    return (
      <StyledSpin tip="Loading" size="large">
        <div className="content" />
      </StyledSpin>
    )
  }

  if (waiting) {
    return (
      <FullPageDiv>
        <NowWaitingBox team={2}></NowWaitingBox>
        <button onClick={cancelWaiting}>대기 취소하기</button>
      </FullPageDiv>
    )
  }

  return (
    <FullPageDiv>
      <Header
        Left={stepNumber !== StepNumber.SelectHeadCounter && PreviousButton(prevPage)}
        HeaderName={headerNames[stepNumber]}
      />
      {stepNumber === StepNumber.SelectHeadCounter && <Step1 nextPage={nextPage} data={data} />}
      {stepNumber === StepNumber.RegisterWaiting && <Step2 data={data} restaurant={restaurant} onSubmit={onSubmit} />}
    </FullPageDiv>
  )
}

const PreviousButton = (prevPage: () => void) => {
  return (
    <PrevButton onClick={prevPage}>
      <FontAwesomeIcon icon={faChevronLeft} />
    </PrevButton>
  )
}

const Step1 = ({ nextPage, data }: any) => {
  const [formData, setFormData] = useState(data)
  const handleNextPage = () => {
    nextPage(formData)
  }
  // 유효성검사 및 필드값 확인 로직 넣어야함.
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
        <h4 style={{ flex: '1', margin: '0 20px' }}>인원수를 선택하세요</h4>
        <div style={{ flex: '1', margin: '0 20px' }}>
          <button onClick={() => setFormData({ head_count: formData['head_count'] - 1 })}>-</button>
          {formData.head_count}
          <button onClick={() => setFormData({ head_count: formData['head_count'] + 1 })}>+</button>
        </div>
      </div>

      <FixedFlexDiv>
        <StyledButton onClick={handleNextPage}>다음</StyledButton>
      </FixedFlexDiv>
    </div>
  )
}

const Step2 = ({ data, restaurant, onSubmit }: any) => {
  const team = 2
  // 데이터 확인 및 제출 로직 넣어야 함.
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
        <h4 style={{ flex: '1', margin: '0 20px' }}>{restaurant.name}에</h4>
        <h4 style={{ flex: '1', margin: '0 20px' }}>웨이팅 등록하시겠어요?</h4>
      </div>
      <NowWaitingBox team={team}></NowWaitingBox>
      <FixedFlexDiv>
        <StyledButton onClick={onSubmit}>웨이팅 등록하기</StyledButton>
      </FixedFlexDiv>
    </div>
  )
}

const FullPageDiv = styled.div`
  position: block;
  min-width: 320px;
  max-width: 700px;
  padding-bottom: 9rem;
  margin: auto;
  height: 100%;
  justify-content: center;
  align-items: center;
`

const FixedFlexDiv = styled.div`
  position: fixed;
  bottom: 0px;
  width: 100%;
  min-width: 320px;
  max-width: 700px;
  display: flex;
`

const PrevButton = styled.button`
  background-color: transparent;
  border: none;
  font-size: 24pt;
  cursor: pointer;
`

export default WaitingPage
