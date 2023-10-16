import MainBanner from 'Component/MenuBoardComponent/MainBanner'
import { useRestaurantState } from 'Context/restaurantContext'
import ErrorPage from 'Pages/ErrorPage'
import getImageSrc from 'Utils/getImageSrc'
import { Spin } from 'antd'
import { ReactComponent as Chevron } from 'assets/Chevron.svg'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

const SliderContainer: React.FC = () => {
  const { data: restaurant, loading, error } = useRestaurantState().restaurant
  if (loading) {
    return (
      <StyledSpin tip="Loading" size="large">
        <div className="content" />
      </StyledSpin>
    )
  }
  if (error) return <ErrorPage errorCode={500} />

  const navigate = useNavigate()

  const handleIconLeftClick = () => {
    navigate('/restaurants')
  }

  return (
    <StyledContainer>
      <MainBanner
        images={
          restaurant && restaurant.banner_images
            ? restaurant.banner_images.map((banner_image) => {
                return getImageSrc(banner_image)
              })
            : []
        }
      />
      <IconLeft onClick={handleIconLeftClick}>
        <Chevron width="2rem" height="2rem" fill="#212121" />
      </IconLeft>
      {/* <IconRight>
        <LocalLanguage width="2rem" height="2rem" fill="#212121" />
      </IconRight> */}
      <RestaurantName>{restaurant?.name}</RestaurantName>
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

const RestaurantName = styled.h1`
  color: ${({ theme }) => theme.COLOR.common.white[0]};
  font-style: normal;
  font-weight: 900;

  position: absolute;
  left: 2rem;
  bottom: 2rem;
  margin: 0;
`
export const StyledSpin = styled(Spin)`
  &&& {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) scale(4);
  }
`