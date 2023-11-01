import styled from 'styled-components'
interface OwnProps {
  title: string
  price: number
  description: string
}

const DescriptionContainer: React.FC<OwnProps> = ({ title, price, description }) => {
  return (
    <div style={{ cursor: 'default' }}>
      <TitleContainer>
        <Title>{title}</Title>
        <Description>{description}</Description>
      </TitleContainer>
      <PriceContainer>
        <PriceSpan>가격</PriceSpan>
        <PriceSpan>{price.toLocaleString()}원</PriceSpan>
      </PriceContainer>
    </div>
  )
}

export default DescriptionContainer

const TitleContainer = styled.div`
  display: inline-flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.8rem;
  padding: 2rem;
`
const Title = styled.h2`
  color: ${({ theme }) => theme.COLOR.common.gray[10]};
  margin: 0;
  font-style: normal;
  font-weight: 700;
  line-height: 2.8rem;
`

const Description = styled.h4`
  color: ${({ theme }) => theme.COLOR.common.gray[40]};
  margin: 0;
  font-size: 1.4rem;
  font-style: normal;
  font-weight: 400;
  line-height: 2rem;
`

const PriceContainer = styled.div`
  display: flex;
  padding: 2rem;
  justify-content: space-between;
  align-items: flex-start;
`

const PriceSpan = styled.h3`
  color: ${({ theme }) => theme.COLOR.common.gray[10]};
  margin: 0;
  font-style: normal;
  font-weight: 600;
  line-height: 2.4rem;
`
