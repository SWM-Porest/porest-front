import { fetchgetRestaurantWaiting } from 'Api/getWaiting'
import { useAccessToken } from 'Api/tokenCookie'
import { useParams } from 'react-router-dom'
import { StyledSpin } from './MenuBoardPage'
import { FullPageDiv } from 'Component/WaitingComponent/HeadCountForm'
import { Waiting } from 'Api/waitingRegistration'
import Header from 'Component/Header'
import styled from 'styled-components'
import { useEffect, useState } from 'react'
import { fetchWaitingCall, fetchWaitingCancel, fetchWaitingSeated } from 'Api/updateWaiting'

const EditWaitingPage = () => {
  const { restaurant_id } = useParams<{ restaurant_id: string }>()
  const restaurantId = restaurant_id || ''
  const [accessToken] = useAccessToken()
  const [waitings, setWaitings] = useState<Waiting[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchWaitings = async () => {
      const response = await fetchgetRestaurantWaiting(restaurantId, accessToken)
      setWaitings(response)
      setIsLoading(false)
    }
    fetchWaitings()
  }, [])

  const handleWaitingCancel = (waitingId: string) => {
    fetchWaitingCancel(accessToken, waitingId)
      .catch(() => {
        alert('취소를 실패했습니다. 페이지를 새로고침합니다.')
        window.location.reload()
      })
      .then((response) => {
        if (response) {
          const newWaitings = waitings.filter((waiting) => waiting._id !== waitingId)
          setWaitings(newWaitings)
          console.log('취소')
        }
      })
  }
  const handleWaiting = (waitingId: string, status: number) => {
    switch (status) {
      case 1:
        fetchWaitingCall(accessToken, waitingId)
          .catch(() => {
            alert('호출을 실패했습니다. 페이지를 새로고침합니다.')
            window.location.reload()
          })
          .then((response) => {
            if (response) {
              const newWaitings = waitings.map((waiting) => {
                if (waiting._id === waitingId) {
                  waiting.status = 2
                }
                return waiting
              })
              setWaitings(newWaitings)
              console.log('호출')
            }
          })
        break
      case 2:
        fetchWaitingSeated(accessToken, waitingId)
          .catch(() => {
            alert('입장을 실패했습니다. 페이지를 새로고침합니다.')
            window.location.reload()
          })
          .then((response) => {
            if (response) {
              const newWaitings = waitings.filter((waiting) => waiting._id !== waitingId)
              setWaitings(newWaitings)
              console.log('입장')
            }
          })
    }
  }

  if (isLoading) {
    return (
      <StyledSpin tip="Loading" size="large">
        <div className="content" />
      </StyledSpin>
    )
  }

  return (
    <FullPageDiv>
      <Header HeaderName="웨이팅 관리" />
      <WaitingList>
        {waitings.map((waiting: Waiting) => {
          return (
            <WaitingItem key={waiting._id}>
              <WaitingItemBanner $status={waiting.status}>{waiting.user_nick}</WaitingItemBanner>
              <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                <p style={{ margin: 10 }}>{waiting.head_count}명</p>
                <p style={{ margin: 10 }}>{waiting.status === 1 ? '대기중' : '호출중'}</p>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                <StyledLeftButton onClick={() => handleWaitingCancel(waiting._id)} style={{ margin: 0 }}>
                  취소
                </StyledLeftButton>
                <StyledButton onClick={() => handleWaiting(waiting._id, waiting.status)} style={{ margin: 0 }}>
                  {waiting.status === 1 ? '호출' : '입장'}
                </StyledButton>
              </div>
            </WaitingItem>
          )
        })}
      </WaitingList>
    </FullPageDiv>
  )
}

export default EditWaitingPage

const WaitingList = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: center;
  list-style: none;
  margin: auto;
  margin-top: 20px;
  padding: 0;
`
const WaitingItem = styled.li`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1;
  margin: 20px;
`
const WaitingItemBanner = styled.div<{ $status: number }>`
  width: 100%;
  margin: 0;
  color: #ffffff;
  padding: 20px;
  border-radius: 10px 10px 0 0;
  background-color: ${(props) => {
    switch (props.$status) {
      case 1:
        return '#3FBA73'
      case 2:
        return '#2B81FF'
    }
  }};
`
const StyledButton = styled.button`
  display: inline-block;
  padding: 10px 20px;
  background-color: darkgray;
  color: #fff;
  border: none;
  border-radius: 0 0 5px 0;
  font-size: 16px;
  cursor: pointer;
`
const StyledLeftButton = styled(StyledButton)`
  border-radius: 0 0 0 5px;
`
