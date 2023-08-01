import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import styled from 'styled-components'

interface AmountContainerProps {
  count: number
  handleQuantity: (type: string) => void
}

const AmountCheck: React.FC<AmountContainerProps> = ({ count, handleQuantity }) => {
  return (
    <Container>
      <MinusButton onClick={() => handleQuantity('minus')}>
        <FontAwesomeIcon icon={faMinus}></FontAwesomeIcon>
      </MinusButton>
      <CountContainer>
        <CountSpan>{count}</CountSpan>
      </CountContainer>
      <PlusButton onClick={() => handleQuantity('plus')}>
        <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>
      </PlusButton>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-items: center;
  width: 200pt;
  height: 64pt;
  border: 0.1pt solid #c4c4c4;
  border-radius: 8pt;
  margin-bottom: 24pt;
`

const PlusMinusButton = styled.button`
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  height: 64pt;
  font-size: ${({ theme }) => theme.FONT_SIZE.small};
  padding: 0;
  transition: 0.4s;
  color: ${({ theme }) => theme.COLOR.common.black};
  &:active {
    background-color: ${({ theme }) => theme.COLOR.main};
    color: #fff;
    box-shadow: 0px 0px 16px 0 ${({ theme }) => theme.COLOR.main};
    color: ${({ theme }) => theme.COLOR.common.white};
    outline: none;
    transition: 0.4s;
  }
`

const PlusButton = styled(PlusMinusButton)`
  border-radius: 0 8pt 8pt 0;
`
const MinusButton = styled(PlusMinusButton)`
  border-radius: 8pt 0 0 8pt;
`

const CountSpan = styled.span`
  font-size: ${({ theme }) => theme.FONT_SIZE.small};
`

const CountContainer = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
`

export default AmountCheck
