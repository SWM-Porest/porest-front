import styled from 'styled-components'

export interface NowWaitingBoxProps {
  team: number
  head_count: number
  stand: number | undefined
}

const NowWaitingBox = ({ team, head_count, stand }: NowWaitingBoxProps) => {
  return (
    <Container>
      <WaitingBox>
        <GrayFontBox>현재 웨이팅</GrayFontBox>
        <RedFontBox>{team} 팀</RedFontBox>
      </WaitingBox>
      <WaitingDetailBox>
        <BetweenBlackFontBox>
          <span>이용 방식</span>
          <span>먹고 갈게요(매장 식사)</span>
        </BetweenBlackFontBox>
        <BetweenBlackFontBox>
          <span>총 입장 인원</span>
          <span>{head_count} 명</span>
        </BetweenBlackFontBox>
        {stand !== 0 && (
          <BetweenBlackFontBox>
            <span>대기 순번</span>
            <RedSpan>{stand} 번째</RedSpan>
          </BetweenBlackFontBox>
        )}
      </WaitingDetailBox>
      <NoticeBox>
        <TinyRedFontBox>매장 웨이팅 유의사항</TinyRedFontBox>
        <BlackFontBox>
          <BlackFontp>
            웨이팅 등록하기 버튼을 누르면 웨이팅이 등록되며, 알림을 거부하시면 알림을 받으실 수 없습니다. <br />
            <br />
            대기 순서에 맞춰 늦지 않게 매장에 방문해 주세요.
          </BlackFontp>
        </BlackFontBox>
      </NoticeBox>
    </Container>
  )
}
const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin-top: 20px;
`
const InnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  flex: 1;
  padding: 20px;
`

const WaitingBox = styled(InnerContainer)`
  margin: 0 20px;
  padding: 40px;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.COLOR.common.gray[100]};
`

const BlackFontBox = styled.div`
  display: flex;
  width: 100%;
  padding: 10px 0;
  font-size: ${({ theme }) => theme.FONT_SIZE.medium};
  font-weight: bold;
`
const BlackFontp = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.COLOR.common.black[60]};
  font-size: ${({ theme }) => theme.FONT_SIZE.medium};
  font-weight: bold;
`
const BetweenBlackFontBox = styled(BlackFontBox)`
  justify-content: space-between;
`

const GrayFontBox = styled.div`
  color: ${({ theme }) => theme.COLOR.common.gray[40]};
  font-size: ${({ theme }) => theme.FONT_SIZE.medium};
  font-weight: bold;
`

const RedFontBox = styled.div`
  color: ${({ theme }) => theme.COLOR.common.red[200]};
  font-size: ${({ theme }) => theme.FONT_SIZE.medium};
  margin-top: 10px;
  font-weight: bold;
`
const TinyRedFontBox = styled(RedFontBox)`
  font-size: ${({ theme }) => theme.FONT_SIZE.medium};
`

const WaitingDetailBox = styled(InnerContainer)`
  margin: 0 20px;
  border-bottom: 1px solid ${({ theme }) => theme.COLOR.common.gray[100]};
`

const NoticeBox = styled(InnerContainer)`
  margin: 20px 20px;
  padding: 20px;
  background-color: ${({ theme }) => theme.COLOR.common.gray[110]};
  border-radius: 12px;
  align-items: flex-start;
`
const RedSpan = styled.span`
  color: ${({ theme }) => theme.COLOR.common.red[200]};
`

export default NowWaitingBox
