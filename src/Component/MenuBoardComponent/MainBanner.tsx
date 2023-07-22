import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

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

const SliderWrapper = styled.div`
  position: relative;
  margin: 32pt;
`

const PreviousButton = styled.button`
  position: absolute;
  top: 50%;
  left: 16pt;
  transform: translateY(-50%);
  background-color: transparent;
`
// 버튼 Styled태그 만들고, left, right는 따로 넣기
// transition 넣어보기~

const NextButton = styled.button`
  position: absolute;
  top: 50%;
  right: 16pt;
  transform: translateY(-50%);
  background-color: transparent;
`

const ArrowImage = styled.img`
  width: 32pt;
  height: 32pt;
`

const SliderImage = styled.img`
  width: 100%;
  border-radius: 16pt;
`
