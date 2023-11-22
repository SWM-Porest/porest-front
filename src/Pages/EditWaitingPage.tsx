import { fetchgetRestaurantWaiting } from 'Api/getWaiting'
import { useAccessToken } from 'Api/tokenCookie'
import { useParams } from 'react-router-dom'
import { StyledSpin } from './MenuBoardPage'
import { FullPageDiv, RotateButton } from 'Component/WaitingComponent/HeadCountForm'
import { Waiting } from 'Api/waitingRegistration'
import Header from 'Component/Header'
import styled from 'styled-components'
import { useEffect, useState } from 'react'
import { fetchWaitingCall, fetchWaitingManagerCancel, fetchWaitingSeated } from 'Api/updateWaiting'
import dayjs, { Dayjs } from 'dayjs'
import duration, { Duration } from 'dayjs/plugin/duration'
import { ChevronLeft20Filled } from '@fluentui/react-icons'
dayjs.extend(duration)

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
    fetchWaitingManagerCancel(accessToken, waitingId)
      .catch(() => {
        alert('취소를 실패했습니다. 페이지를 새로고침합니다.')
        window.location.reload()
      })
      .then((response) => {
        if (response) {
          const newWaitings = waitings.filter((waiting) => waiting._id !== waitingId)
          setWaitings(newWaitings)
          // console.log('취소')
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
              const newWaitings = waitings
                .map((waiting) => {
                  if (waiting._id === waitingId) {
                    waiting.status = 2
                    return response
                  }
                  return waiting
                })
                .sort((a, b) => b.status - a.status)
              setWaitings(newWaitings)
              // console.log('호출')
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
              // console.log('입장')
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
      <Header
        HeaderName="웨이팅 관리"
        Left={
          <ChevronLeft20Filled
            color="#212121"
            onClick={() => {
              window.location.href = '/mypage'
            }}
          />
        }
        Right={<RotateButton />}
      />
      <WaitingList>
        {waitings.map((waiting: Waiting) => {
          return (
            <WaitingItem key={waiting._id}>
              <FlexDivBetween>
                <FlexDivColumn>
                  <NickNameBox>
                    {waiting.user_nick} ({waiting.head_count}명)
                  </NickNameBox>
                  <DetailBox>{getTimeDiff(dayjs(waiting.created_at))}</DetailBox>
                </FlexDivColumn>
                <FlexDivColumn>
                  <StatusButton $status={waiting.status}>{waiting.status === 1 ? '대기중' : '호출중'}</StatusButton>
                </FlexDivColumn>
              </FlexDivBetween>
              <FlexDivBetween>
                <StyledButton $status={0} onClick={() => handleWaitingCancel(waiting._id)} style={{ margin: 0 }}>
                  취소하기
                </StyledButton>
                <StyledButton
                  $status={waiting.status}
                  onClick={() => handleWaiting(waiting._id, waiting.status)}
                  style={{ margin: 0 }}
                >
                  {waiting.status === 1 ? '호출하기' : '입장하기'}
                </StyledButton>
              </FlexDivBetween>
            </WaitingItem>
          )
        })}
      </WaitingList>
    </FullPageDiv>
  )
}

export default EditWaitingPage

export const getTimeDiff = (time: Dayjs): string => {
  const timeDiffDuration: Duration = dayjs.duration(dayjs().diff(time))
  const yearDiff: number = parseInt(timeDiffDuration.format('Y'))
  const monthDiff: number = parseInt(timeDiffDuration.format('M'))
  const dateDiff: number = parseInt(timeDiffDuration.format('D'))
  const hourDiff: number = parseInt(timeDiffDuration.format('H'))
  const minuteDiff: number = parseInt(timeDiffDuration.format('m'))
  const secondDiff: number = parseInt(timeDiffDuration.format('s'))

  if (yearDiff > 0) {
    return `${yearDiff}년 전`
  } else if (monthDiff > 0) {
    return `${monthDiff}달 전`
  } else if (dateDiff > 0) {
    return `${dateDiff}일 전`
  } else if (hourDiff > 0) {
    return `${hourDiff}시간 전`
  } else if (minuteDiff > 0) {
    return `${minuteDiff}분 전`
  } else if (secondDiff > 0) {
    return `${secondDiff}초 전`
  } else {
    return '방금 전'
  }
}

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
  overflow: hidden;
  background-color: ${({ theme }) => theme.COLOR.common.gray[900]};
  border-radius: 12px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1;
  margin: 0px 20px 16px;
`
const WaitingItemBanner = styled.div<{ $status: number }>`
  width: 100%;
  margin: 0;
  color: ${({ theme }) => theme.COLOR.common.black};
  font-weight: bold;
  padding: 20px;
  border-radius: 10px 10px 0 0;
  }};
`
const FlexDiv = styled.div`
  display: flex;
`
const FlexDivBetween = styled(FlexDiv)`
  padding: 16px;
  width: 100%;
  justify-content: space-between;
`
const FlexDivColumn = styled(FlexDiv)`
  flex-direction: column;
  justify-content: space-between;
  align-items: start;
`
const NickNameBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
  color: ${({ theme }) => theme.COLOR.common.black};
  font-weight: bold;
`
const DetailBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin: 0;
  color: ${({ theme }) => theme.COLOR.common.gray[90]};
`
const StatusButton = styled.div<{ $status: number }>`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
  padding: 16px;
  border-radius: 20px;
  font-weight: 700;
  font-size: ${({ theme }) => theme.FONT_SIZE.medium};
  background-color: ${(props) => {
    switch (props.$status) {
      case 1:
        return '#ECF8F1'
      case 2:
        return '#EAF2FF'
    }
  }};
  color: ${(props) => {
    switch (props.$status) {
      case 1:
        return '#3FBA73'
      case 2:
        return '#2B81FF'
    }
  }};
`
const StyledButton = styled.button<{ $status: number }>`
  display: inline-block;
  padding: 10px 20px;
  background-color: darkgray;
  color: ${(props) => {
    switch (props.$status) {
      case 0:
        return '#666666'
      case 1:
        return '#FFFFFF'
      case 2:
        return '#FFFFFF'
    }
  }};
  background-color: ${(props) => {
    switch (props.$status) {
      case 0:
        return '#EEEEEE'
      case 1:
        return '#3FBA73'
      case 2:
        return '#2B81FF'
    }
  }};
  border: none;
  border-radius: 12px;
  font-size: ${({ theme }) => theme.FONT_SIZE.medium};
  font-weight: 700;
  cursor: pointer;
`
