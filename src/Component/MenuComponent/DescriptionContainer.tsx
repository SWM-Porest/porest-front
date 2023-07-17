import styled from 'styled-components'

const DContainerImg = styled.div`
  position: relative;
  z-index: auto;
`
const DContainerDes = styled.div`
  position: relative;
  bottom: 75px;
`
const TitleBox = styled.div`
  position: relative;
  padding: 36px 36px 30px;
  border-radius: 15px;
  background: #fff;
  box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.08);
  width: 80%;
  margin: auto;
  z-index: auto;
`
const TitleInner = styled.div`
  width: 90%;
  margin: auto;
  padding: 0;
  font-size: 3.5rem;
`
const PriceSpan = styled.span`
  color: #ff5757;
`
const StyledImage = styled.img`
  width: 100%;
  padding: 25px 0px 0px;
`
const DescriptionSpan = styled.p`
  margin: 0;
  color: gray;
  font-size: 2rem;
`

const DescriptionContainer = ({ title, price, description }: any) => {
  return (
    <div style={{ display: 'block' }}>
      <DContainerImg>
        <StyledImage src="img/menu.png" alt="짜장 이미지" />
      </DContainerImg>

      <DContainerDes>
        <TitleBox>
          <TitleInner>
            <span>{title}</span>
          </TitleInner>
          <TitleInner>
            <PriceSpan>{price}원</PriceSpan>
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
