import React from 'react'
import styled from 'styled-components'

interface OwnProps {
  price: number
}

const TotalPrice: React.FC<OwnProps> = (price) => {
  const totalprice = price.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')

  return (
    <div>
      <StyledContainer>
        <StyledH3> 결제 상세 </StyledH3>
        <InnerContainer>
          <StyledTitle> 주문 금액 </StyledTitle>
          <StyledPrice>{totalprice}원</StyledPrice>
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
  padding: 48pt;
  display: block;
  margin-bottom: 16pt;
`
const StyledH3 = styled.h3`
  display: block;
  margin-bottom: 32pt;
  padding-bottom: 32pt;
  border-bottom: 1px dashed;
  border-color: ${({ theme }) => theme.COLOR.sub};
`
const InnerContainer = styled.div`
  position: relative;
  display: block;
`
const StyledTitle = styled.h5`
  display: inline-block;
  vertical-align: top;
  margin: 0;
`
const StyledPrice = styled.h5`
  float: right;
  margin: 0;
  text-align: right;
`
const InnerTotalContainer = styled.div`
  margin-top: 32pt;
  padding-top: 32pt;
  border-top: 1.5px solid;
  position: relative;
  display: block;
`
const StyledTotalTitle = styled.h4`
  display: inline-block;
  vertical-align: top;
  margin: 0;
`
const StyledTotalPrice = styled.h4`
  overflow: hidden;
  float: right;
  padding-left: 8pt;
  display: block;
  margin: 0;
  color: ${({ theme }) => theme.COLOR.number_price};
`
