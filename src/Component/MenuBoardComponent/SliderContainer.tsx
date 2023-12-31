import MainBanner from 'Component/MenuBoardComponent/MainBanner'
import { Spin } from 'antd'
import styled from 'styled-components'

const SliderContainer: React.FC<{
  images: string[]
  title?: string
  lefticon?: React.ReactNode
  righticon?: React.ReactNode
  intro?: string
}> = ({ images, title, intro, lefticon, righticon }) => {
  return (
    <StyledContainer>
      <MainBanner images={images} />
      {lefticon && <>{lefticon}</>}
      {righticon && <>{righticon}</>}
      {/* <IconRight>
        <LocalLanguage width="2rem" height="2rem" fill="#212121" />
      </IconRight> */}
      <RestaurantInfo>
        {title && <RestaurantName>{title}</RestaurantName>}
        {intro && <RestaurantIntro>{intro}</RestaurantIntro>}
      </RestaurantInfo>
    </StyledContainer>
  )
}

export default SliderContainer

const StyledContainer = styled.div`
  position: relative;
`

const Icon = styled.div`
  display: inline-flex;
  padding: 1rem;
  align-items: flex-start;
  gap: 1rem;
  border-radius: 2rem;
  background: ${({ theme }) => theme.COLOR.common.white[0]};
  box-shadow: 0 0.2rem 1.2rem 0 rgba(0, 0, 0, 0.16);
  position: absolute;
  top: 1rem;
`

const IconLeft = styled(Icon)`
  left: 1.2rem;
`

const IconRight = styled(Icon)`
  right: 1.2rem;
`

const RestaurantInfo = styled.div`
  position: absolute;
  left: 2rem;
  bottom: 3rem;
  margin: 0;
  max-height: 10rem;
  width: 70%;
`

const RestaurantName = styled.h1`
  color: ${({ theme }) => theme.COLOR.common.white[0]};
  font-style: normal;
  font-weight: 900;

  cursor: default;
`

const RestaurantIntro = styled.div`
  color: ${({ theme }) => theme.COLOR.common.white[70]};
  font-style: normal;
  font-weight: 500;
  font-size: 1.6rem;

  max-height: 5rem;
  word-break: break-all;

  cursor: default;
  white-space: normal;
  overflow: auto;
  width: 100%;
`

export const StyledSpin = styled(Spin)`
  &&& {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) scale(4);
  }
`
