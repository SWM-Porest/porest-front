import { Add12Filled, Subtract12Filled } from '@fluentui/react-icons'
import React from 'react'
import styled from 'styled-components'

interface AmountContainerProps {
  count: number
  handleIncrement: () => void
  handleDecrement: () => void
}

const AmountCheck: React.FC<AmountContainerProps> = ({ count, handleIncrement, handleDecrement }) => {
  return (
    <Container>
      <MinusButton onClick={handleDecrement}>
        <Subtract12Filled />
      </MinusButton>
      <CountSpan>{count}</CountSpan>
      <PlusButton onClick={handleIncrement}>
        <Add12Filled />
      </PlusButton>
    </Container>
  )
}

export default AmountCheck

const Container = styled.div`
  display: flex;
  padding: 0.6rem;
  align-items: center;
  gap: 0.4rem;
  border-radius: 2.4rem;
  background: ${({ theme }) => theme.COLOR.common.gray[120]};
`

const PlusMinusButton = styled.button`
  cursor: pointer;
`

const PlusButton = styled(PlusMinusButton)`
  display: flex;
  padding: 0.8rem;
  align-items: flex-start;
  gap: 1rem;
  border-radius: 1.8rem;
  background: ${({ theme }) => theme.COLOR.common.white[0]};
`
const MinusButton = styled(PlusMinusButton)`
  display: flex;
  padding: 0.8rem;
  align-items: flex-start;
  gap: 1rem;
  border-radius: 1.8rem;
  background: ${({ theme }) => theme.COLOR.common.white[0]};
`

const CountSpan = styled.h4`
  color: ${({ theme }) => theme.COLOR.common.gray[20]};
  text-align: center;
  margin: 0;
  font-style: normal;
  font-weight: 500;
  width: 3.6rem;
  cursor: default;
`
