import { Carousel } from 'antd'
import React, { useState } from 'react'
import styled from 'styled-components'

interface SliderProps {
  images: string[]
}

const MainBanner: React.FC<SliderProps> = ({ images }) => {
  const [currentSlide, setCurrentSlide] = useState(0)

  const handleSlideChange = (current: number) => {
    setCurrentSlide(current)
  }

  const totalImages = images.length

  return (
    <SliderContainer>
      <Carousel autoplay dots={false} afterChange={handleSlideChange}>
        {images.map((image, index) => (
          <div key={index}>
            <SliderImage src={image} alt={`이미지 ${index + 1}`} />
          </div>
        ))}
      </Carousel>
      <SliderStatus>
        <WhiteText>{currentSlide + 1}</WhiteText>
        <GreyText>/</GreyText>
        <GreyText>{totalImages}</GreyText>
      </SliderStatus>
    </SliderContainer>
  )
}

export default MainBanner

const SliderContainer = styled.div`
  position: relative;
`

const SliderImage = styled.img`
  aspect-ratio: 1 / 1;
  width: 100%;
`

const SliderStatus = styled.div`
  position: absolute;
  right: 2rem;
  bottom: 2rem;

  display: inline-flex;
  padding: 0.6rem 1.2rem;
  justify-content: flex-end;
  align-items: center;
  gap: 1rem;

  background-color: ${({ theme }) => theme.COLOR.common.black[60]};
  border-radius: 0.8rem;

  font-size: 1.2rem;
  font-style: normal;
  line-height: 1.6rem;
  cursor: default;
`

const WhiteText = styled.span`
  color: ${({ theme }) => theme.COLOR.common.white[0]};
  font-weight: 500;
`

const GreyText = styled.span`
  color: ${({ theme }) => theme.COLOR.common.white[70]};
  font-weight: 400;
`
