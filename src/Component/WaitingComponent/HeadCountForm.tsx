import { StyledButton } from 'Component/MenuComponent/AddCart'
import { useState } from 'react'
import NowWaitingBox, { NowWaitingBoxProps } from './NowWaitingBox'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'

export const Step1 = ({ nextPage, data }: any) => {
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

export const Step2 = ({ data, restaurant, onSubmit, team }: any) => {
  console.log(data)
  // 데이터 확인 및 제출 로직 넣어야 함.
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
        <h4 style={{ flex: '1', margin: '0 20px' }}>{restaurant.name}에</h4>
        <h4 style={{ flex: '1', margin: '0 20px' }}>웨이팅 등록하시겠어요?</h4>
      </div>
      <NowWaitingBox team={team} head_count={data.head_count}></NowWaitingBox>
      <FixedFlexDiv>
        <StyledButton onClick={onSubmit}>웨이팅 등록하기</StyledButton>
      </FixedFlexDiv>
    </div>
  )
}

export const Step3 = ({ data, cancel, team }: any) => {
  console.log(data)
  console.log(team)
  return (
    <>
      <NowWaitingBox team={team} head_count={data.head_count}></NowWaitingBox>
      <FixedFlexDiv>
        <StyledRedButton onClick={() => cancel(data._id)}>웨이팅 취소하기</StyledRedButton>
      </FixedFlexDiv>
    </>
  )
}

export const PreviousButton = ({ prevPage }: any) => {
  return (
    <PrevButton onClick={prevPage}>
      <FontAwesomeIcon icon={faChevronLeft} />
    </PrevButton>
  )
}

export const FullPageDiv = styled.div`
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
const StyledRedButton = styled(StyledButton)`
  background-color: ${({ theme }) => theme.COLOR.common.red[200]};
  &:hover {
    box-shadow: 0px 0px 16pt 0 ${({ theme }) => theme.COLOR.common.red[200]};
    transition: 0.4s;
  }
`
