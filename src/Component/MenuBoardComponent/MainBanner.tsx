import { Carousel } from 'antd'
import React from 'react'
import styled from 'styled-components'

interface SliderProps {
  images: string[]
}

const MainBanner: React.FC<SliderProps> = ({ images }) => {
  return (
    <SliderWrapper>
      <Carousel autoplay>
        {images.map((image, index) => (
          <div key={index}>
            <SliderImage src={image} alt={`이미지 ${index + 1}`} />
          </div>
        ))}
      </Carousel>
    </SliderWrapper>
  )
}

export default MainBanner

const SliderWrapper = styled.div`
  position: relative;
  margin: 24pt 48pt;
`

const SliderImage = styled.img`
  width: 100%;
  height: 600pt;
  border-radius: 16pt;
`
