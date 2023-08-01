import styled from 'styled-components'
interface OwnProps {
  title: string
  price: number
  description: string
  img: string
}

const DescriptionContainer: React.FC<OwnProps> = ({ title, price, description, img }) => {
  const defaultImg = '/img/회색.png'
  return (
    <div style={{ display: 'block' }}>
      <DContainerImg>
        {img ? (
          <StyledImage src={`${img}`} alt="메뉴 이미지" />
        ) : (
          <StyledImage src={`${defaultImg}`} alt="메뉴 이미지" />
        )}
      </DContainerImg>
      <DContainerDes>
        <TitleBox>
          <TitleInner>
            <span>{title}</span>
          </TitleInner>
          <TitleInner>
            <PriceSpan>{price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원</PriceSpan>
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
  margin: 24pt;
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
  padding: 25px 0px 0px;
`
const DescriptionSpan = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.COLOR.common.gray[400]};
  font-size: 2rem;
`
