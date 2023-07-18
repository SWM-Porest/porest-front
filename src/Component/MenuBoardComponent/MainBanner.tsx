import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

const SliderWrapper = styled.div`
  position: relative;
  width: 100%;
  padding: 25px;
  margin: 5px;
`

const PreviousButton = styled.button`
  position: absolute;
  top: 50%;
  left: 20px;
  transform: translateY(-50%);
  background-color: transparent;
  border: none;
  cursor: pointer;
`

const NextButton = styled.button`
  position: absolute;
  top: 50%;
  right: 20px;
  transform: translateY(-50%);
  background-color: transparent;
  border: none;
  cursor: pointer;
`

const ArrowImage = styled.img`
  width: 30px;
  height: 30px;
`

const SliderImage = styled.img`
  width: 100%;
  height: auto;
`

interface SliderProps {
  images: string[]
}

const MainBanner: React.FC<SliderProps> = ({ images }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1))
  }

  const previousImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1))
  }

  useEffect(() => {
    const interval = setInterval(() => {
      nextImage()
    }, 5000)

    return () => {
      clearInterval(interval)
    }
  }, [])

  return (
    <SliderWrapper>
      {currentImageIndex !== 0 && (
        <PreviousButton onClick={previousImage}>
          <ArrowImage src="img/left-arrow.png" alt="이전 이미지" />
        </PreviousButton>
      )}
      <SliderImage src={images[currentImageIndex]} alt="슬라이더 이미지" />
      {currentImageIndex !== images.length - 1 && (
        <NextButton onClick={nextImage}>
          <ArrowImage src="img/right-arrow.png" alt="다음 이미지" />
        </NextButton>
      )}
    </SliderWrapper>
  )
}

export default MainBanner
