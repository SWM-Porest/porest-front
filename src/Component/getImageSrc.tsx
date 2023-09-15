import { Image } from 'Context/restaurantContext'

const getImageSrc = (Img: Image) => {
  const defaultImg = '/img/회색.png'
  return Img && Img.path !== '' ? process.env.REACT_APP_STATIC_URL + Img.path : defaultImg
}

export default getImageSrc
