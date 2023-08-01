import React from 'react'
import styled from 'styled-components'

interface AmountContainerProps {
  count: number
  handleQuantity: (type: string) => void
}

const AmountCheck: React.FC<AmountContainerProps> = ({ count, handleQuantity }) => {
  return (
    <Container>
      <MinusButton onClick={() => handleQuantity('minus')}>-</MinusButton>
      <CountContainer>
        <CountSpan>{count}</CountSpan>
      </CountContainer>
      <PlusButton onClick={() => handleQuantity('plus')}>+</PlusButton>
    </Container>
  )
}

const Container = styled.div`
  position: relative;
  width: 200pt;
  height: 64pt;
  border: 0.1pt solid #c4c4c4;
  border-radius: 8pt;
  margin-bottom: 24pt;
`

const MinusButton = styled.button`
  position: absolute;
  width: 64pt;
  height: 64pt;
  top: 50%;
  left: 0pt;
  transform: translateY(-50%);
  border-top-left-radius: 8pt;
  border-bottom-left-radius: 8pt;
  font-size: ${({ theme }) => theme.FONT_SIZE.small};
  &:hover {
    background-color: #008937;
    border: 1px solid #eee;
    color: #fff;
    box-shadow: 0px 0px 15px 5px #008937;
    outline: none;
  }
`

const PlusButton = styled.button`
  position: absolute;
  width: 64pt;
  height: 64pt;
  top: 50%;
  right: 0pt;
  transform: translateY(-50%);
  border-top-right-radius: 8pt;
  border-bottom-right-radius: 8pt;
  font-size: ${({ theme }) => theme.FONT_SIZE.small};
  &:active {
    background-color: #008937;
    border: 1px solid #eee;
    color: #fff;
    box-shadow: 0px 0px 15px 5px #008937;
    outline: none;
  }
`

const CountSpan = styled.span`
  font-size: ${({ theme }) => theme.FONT_SIZE.small};
  transform: translate(-50%, -50%);
`

const CountContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`

export default AmountCheck
