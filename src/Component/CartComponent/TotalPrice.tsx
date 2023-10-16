import React from 'react'
import styled from 'styled-components'

interface OwnProps {
  price: number
}

const TotalPrice: React.FC<OwnProps> = (price) => {
  const totalprice = price.price.toLocaleString()

  return (
    <div>
      <StyledContainer>
        <StyledH3> 결제할 주문 </StyledH3>
        <InnerContainer>
          <Container1>
            <StyledTitle> 주문 금액 </StyledTitle>
            <StyledPrice>{totalprice}원</StyledPrice>
          </Container1>
        </InnerContainer>
        <InnerTotalContainer>
          <StyledTotalTitle> 총 결제 금액 </StyledTotalTitle>
          <StyledTotalPrice>{totalprice}원</StyledTotalPrice>
        </InnerTotalContainer>
      </StyledContainer>
    </div>
  )
}
export default TotalPrice

const StyledContainer = styled.div`
  display: inline-flex;
  padding: 2rem;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.6rem;
  cursor: default;
  background-color: ${({ theme }) => theme.COLOR.common.white[0]};
`

const StyledH3 = styled.h3`
  color: ${({ theme }) => theme.COLOR.common.gray[20]};
  font-style: normal;
  font-weight: 700;
`

const InnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.2rem;
`

const Container1 = styled.div`
  display: flex;
  width: 35rem;
  justify-content: space-between;
  align-items: flex-start;
`

const StyledTitle = styled.h4`
  color: ${({ theme }) => theme.COLOR.common.gray[40]};
  margin: 0;
  font-style: normal;
  font-weight: 400;
`

const StyledPrice = styled.h4`
  color: ${({ theme }) => theme.COLOR.common.gray[20]};
  margin: 0;
  font-style: normal;
  font-weight: 500;
`

const InnerTotalContainer = styled.div`
  display: flex;
  width: 35rem;
  justify-content: space-between;
  align-items: flex-start;
`

const StyledTotalTitle = styled.h3`
  color: ${({ theme }) => theme.COLOR.common.gray[20]};
  margin: 0;
  font-style: normal;
  font-weight: 700;
`

const StyledTotalPrice = styled.h3`
  color: ${({ theme }) => theme.COLOR.main};
  margin: 0;
  font-style: normal;
  font-weight: 700;
`
