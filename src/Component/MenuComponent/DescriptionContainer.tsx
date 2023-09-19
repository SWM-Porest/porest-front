import styled from 'styled-components'
interface OwnProps {
  title: string
  price: number
  description: string
  img: string
}

const DescriptionContainer: React.FC<OwnProps> = ({ title, price, description, img }) => {
  return (
    <div style={{ display: 'block', cursor: 'default' }}>
      <DContainerImg>{img ? <StyledImage src={`${img}`} alt="메뉴 이미지" /> : <BackDiv></BackDiv>}</DContainerImg>
      <DContainerDes>
        <TitleBox>
          <TitleInner>
            <span>{title}</span>
          </TitleInner>
          <TitleInner>
            <PriceSpan>{price.toLocaleString()}원</PriceSpan>
          </TitleInner>
          <TitleInner>
            <DescriptionSpan>{description}</DescriptionSpan>
          </TitleInner>
        </TitleBox>
      </DContainerDes>
    </div>
  )
}

export default DescriptionContainer

const DContainerImg = styled.div`
  position: relative;
  z-index: 10;
  margin: 0pt 0pt 24pt 0pt;
`
const DContainerDes = styled.div`
  position: relative;
  bottom: 56pt;
`
const TitleBox = styled.div`
  position: relative;
  padding: 32pt 32pt 24pt;
  border-radius: 16pt;
  background: #fff;
  box-shadow: 0 4px 12px 0 rgba(0, 0, 0, 0.15);
  width: 90%;
  margin: auto;
  z-index: 20;
`
const TitleInner = styled.div`
  width: 90%;
  margin: auto;
  padding: 0;
  font-size: 3.5rem;
  font-weight: bold;
`
const PriceSpan = styled.span`
  color: ${({ theme }) => theme.COLOR.number_price};
`
const StyledImage = styled.img`
  width: 100%;
`
const DescriptionSpan = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.COLOR.common.gray[400]};
  font-size: 2rem;
`
const BackDiv = styled.div`
  background-color: ${({ theme }) => theme.COLOR.common.gray[700]};
  height: 128pt;
`
