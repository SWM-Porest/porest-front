import React, { useEffect, useState } from 'react'
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
    <div style={{ position: 'relative' }}>
      {currentImageIndex !== 0 && (
        <button
          onClick={previousImage}
          style={{
            position: 'absolute',
            top: '50%',
            left: '10px',
            transform: 'translateY(-50%)',
            backgroundColor: 'transparent',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          <img src="img/left-arrow.png" alt="이전 이미지" style={{ width: '30px', height: '30px' }} />
        </button>
      )}
      <img src={images[currentImageIndex]} alt="슬라이더 이미지" style={{ width: '100%', height: 'auto' }} />
      {currentImageIndex !== images.length - 1 && (
        <button
          onClick={nextImage}
          style={{
            position: 'absolute',
            top: '50%',
            right: '10px',
            transform: 'translateY(-50%)',
            backgroundColor: 'transparent',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          <img src="img/right-arrow.png" alt="다음 이미지" style={{ width: '30px', height: '30px' }} />
        </button>
      )}
    </div>
  )
}

export default MainBanner
