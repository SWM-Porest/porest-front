import React from 'react'
import styled from 'styled-components'

interface OwnProps {
  total_price: number
  discount?: number
}

const TotalPrice: React.FC<OwnProps> = ({ total_price, discount }) => {
  const [total_price_result, setTotalPriceResult] = React.useState(total_price)
  if (discount) {
    setTotalPriceResult(total_price - discount)
  }
  return (
    <Container>
      <Title>결제한 주문</Title>
      <DetailPriceContainer>
        <OrderPriceContainer>
          <DetailPriceTitle>주문 금액</DetailPriceTitle>
          <DetailPrice>{total_price.toLocaleString()}원</DetailPrice>
        </OrderPriceContainer>

        <OrderPriceContainer>
          <DetailPriceTitle>할인 금액</DetailPriceTitle>
          {discount ? <DetailPrice>{discount.toLocaleString()}원</DetailPrice> : <DetailPrice>0원</DetailPrice>}
        </OrderPriceContainer>
      </DetailPriceContainer>
      <Division></Division>
      <TotalPriceContainer>
        <TotalPriceTitle>총 결제 금액</TotalPriceTitle>
        <TotalPriceText>{total_price_result.toLocaleString()}원</TotalPriceText>
      </TotalPriceContainer>
    </Container>
  )
}

export default TotalPrice

const Container = styled.div`
  width: 100%;
  display: inline-flex;
  padding: 2rem;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.6rem;
  background-color: ${({ theme }) => theme.COLOR.common.white[0]};
`

const Title = styled.h3`
  color: ${({ theme }) => theme.COLOR.common.gray[20]};
  margin: 0;
  font-style: normal;
  font-weight: 700;
  line-height: 2.4rem;
`

const DetailPriceContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.2rem;
`

const OrderPriceContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: flex-start;
`

const DetailPriceTitle = styled.h4`
  color: ${({ theme }) => theme.COLOR.common.gray[40]};
  margin: 0;
  font-style: normal;
  font-weight: 400;
  line-height: 2rem;
`

const DetailPrice = styled.h4`
  color: ${({ theme }) => theme.COLOR.common.gray[20]};
  margin: 0;
  font-style: normal;
  font-weight: 500;
  line-height: 2rem;
`

const Division = styled.div`
  width: 100%;
  height: 0.1rem;
  background-color: ${({ theme }) => theme.COLOR.common.gray[120]};
`

const TotalPriceContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: flex-start;
`

const TotalPriceTitle = styled.h3`
  color: ${({ theme }) => theme.COLOR.common.gray[20]};
  margin: 0;
  font-style: normal;
  font-weight: 700;
  line-height: 2.4rem;
`

const TotalPriceText = styled.h3`
  color: ${({ theme }) => theme.COLOR.main};
  font-style: normal;
  font-weight: 700;
  line-height: 2.4rem;
  margin: 0;
`
