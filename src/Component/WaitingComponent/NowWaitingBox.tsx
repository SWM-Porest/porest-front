import styled from 'styled-components'

export interface NowWaitingBoxProps {
  team: number
  head_count: number
}

const NowWaitingBox = ({ team, head_count }: NowWaitingBoxProps) => {
  return (
    <Container>
      <WaitingBox>
        <GrayFontBox>현재 웨이팅</GrayFontBox>
        <RedFontBox>{team} 팀</RedFontBox>
      </WaitingBox>
      <WaitingDetailBox>
        <BetweenBlackFontBox>
          <div>이용 방식</div>
          <div>먹고 갈게요(매장 식사)</div>
        </BetweenBlackFontBox>
        <BetweenBlackFontBox>
          <div>총 입장 인원</div>
          <div>{head_count} 명</div>
        </BetweenBlackFontBox>
      </WaitingDetailBox>
      <NoticeBox>
        <TinyRedFontBox>매장 웨이팅 유의사항</TinyRedFontBox>
        <BlackFontBox>대기 순서에 맞춰 늦지 않게 매장에 방문해 주세요.</BlackFontBox>
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
  border: 1px solid ${({ theme }) => theme.COLOR.common.gray[700]};
`

const BlackFontBox = styled.div`
  display: flex;
  width: 100%;
  padding: 10px 0;
  color: ${({ theme }) => theme.COLOR.common.black};
  font-size: ${({ theme }) => theme.FONT_SIZE.tiny};
  font-weight: bold;
`
const BetweenBlackFontBox = styled(BlackFontBox)`
  justify-content: space-between;
`

const GrayFontBox = styled.div`
  color: ${({ theme }) => theme.COLOR.common.gray[300]};
  font-size: ${({ theme }) => theme.FONT_SIZE.tiny};
  font-weight: bold;
`

const RedFontBox = styled.div`
  color: ${({ theme }) => theme.COLOR.common.red[200]};
  font-size: ${({ theme }) => theme.FONT_SIZE.small};
  margin-top: 10px;
  font-weight: bold;
`
const TinyRedFontBox = styled(RedFontBox)`
  font-size: ${({ theme }) => theme.FONT_SIZE.tiny};
`

const WaitingDetailBox = styled(InnerContainer)`
  margin: 0 20px;
  border-bottom: 1px solid ${({ theme }) => theme.COLOR.common.gray[700]};
`

const NoticeBox = styled(InnerContainer)`
  margin: 20px 20px;
  padding: 20px;
  background-color: ${({ theme }) => theme.COLOR.common.gray[800]};
  border-radius: 12px;
  align-items: flex-start;
`

export default NowWaitingBox
