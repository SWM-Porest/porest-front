import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRightRotate, faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import NowWaitingBox from './NowWaitingBox'
import { StyledButton } from 'Component/MenuComponent/AddCart'
import AmountCheck from 'Utils/AmountCheck'
import axios from 'axios'

export const Step1 = ({ nextPage, data }: any) => {
  const [formData, setFormData] = useState(data)
  const handleNextPage = () => {
    nextPage(formData)
  }
  const handleIncrement = () => {
    setFormData({ head_count: formData['head_count'] + 1 })
  }
  const handleDecrement = () => {
    setFormData({ head_count: formData['head_count'] - 1 })
  }
  // 유효성검사 및 필드값 확인 로직 넣어야함.
  return (
    <div>
      <Container>
        <h4 style={{ flex: '1', margin: '0 20px' }}>인원수를 선택하세요</h4>
        <Container1>
          <Container2>인 원</Container2>
          <StyledAmountContainer>
            <AmountCheck
              count={formData.head_count}
              handleIncrement={handleIncrement}
              handleDecrement={handleDecrement}
            />
          </StyledAmountContainer>
        </Container1>
        <ButtonContainer>
          <StyledNextButton onClick={handleNextPage}>다음</StyledNextButton>
        </ButtonContainer>
      </Container>
    </div>
  )
}

export const Step2 = ({ data, restaurant, onSubmit, team }: any) => {
  // 데이터 확인 및 제출 로직 넣어야 함.
  return (
    <Container>
      <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
        <h2 style={{ flex: '1', margin: '0 20px' }}>{restaurant.name}에</h2>
        <h2 style={{ flex: '1', margin: '0 20px' }}>웨이팅 등록하시겠어요?</h2>
      </div>
      <NowWaitingBox team={team} head_count={data.head_count} stand={0}></NowWaitingBox>
      <ButtonContainer>
        <StyledNextButton onClick={onSubmit}>웨이팅 등록하기</StyledNextButton>
      </ButtonContainer>
    </Container>
  )
}

export const Step3 = ({ data, cancel, team, accessToken }: any) => {
  const [standData, setStandData] = useState<number>(0)
  useEffect(() => {
    const getStandData = async () => {
      await axios({
        method: 'GET',
        url: `${process.env.REACT_APP_API_URL}/waitings/${data.restaurant_id}/team/${data._id}`,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }).then((res) => {
        setStandData(res.data)
      })
    }
    getStandData()
  }, [])
  return (
    <Container>
      <NowWaitingBox team={team} head_count={data.head_count} stand={standData}></NowWaitingBox>
      <ButtonContainer>
        <StyledRedButton onClick={() => cancel(data._id)}>웨이팅 취소하기</StyledRedButton>
      </ButtonContainer>
    </Container>
  )
}

export const PreviousButton = ({ prevPage }: any) => {
  return (
    <PrevButton onClick={prevPage}>
      <FontAwesomeIcon icon={faChevronLeft} />
    </PrevButton>
  )
}

export const RotateButton = () => {
  const refresh = () => {
    window.location.reload()
  }
  return (
    <PrevButton onClick={refresh}>
      <FontAwesomeIcon width="2rem" height="2rem" icon={faArrowRightRotate} />
    </PrevButton>
  )
}

export const FullPageDiv = styled.div`
  position: block;
  padding-bottom: 9rem;
  margin: auto;
  height: 100%;
  justify-content: center;
  align-items: center;
`

const PrevButton = styled.button`
  background-color: transparent;
  border: none;
  font-size: 24pt;
  cursor: pointer;
  margin-right: 5px;
`
const ButtonContainer = styled.div`
  @media screen and (min-width: 800px) {
    max-width: 430px;
  }
  display: flex;
  width: inherit;
  position: fixed;
  bottom: 0px;
  flex: 1;
  margin: auto;
  margin-bottom: 20px;
`
const StyledNextButton = styled(StyledButton)`
  flex: 1;
  margin: 0 20px;
  width: auto;
`
const StyledRedButton = styled(StyledButton)`
  margin: 0 20px;
  flex: 1;
  width: auto;
  background-color: ${({ theme }) => theme.COLOR.common.red[200]};
  &:hover {
    box-shadow: 0px 0px 16pt 0 ${({ theme }) => theme.COLOR.common.red[200]};
    transition: 0.4s;
  }
`
const StyledAmountContainer = styled.div`
  padding-left: 50pt;
`
const Container = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
`
const Container1 = styled.div`
  width: 100%;
  display: flex;
  padding: 2rem;
  justify-content: space-between;
  align-items: center;
`
const Container2 = styled.div`
  color: ${({ theme }) => theme.COLOR.common.gray[20]};
  font-family: Pretendard;
  font-size: ${({ theme }) => theme.FONT_SIZE.medium};
  font-style: normal;
  font-weight: bold;
  line-height: 2rem;
`
