import { getTotalCartItems } from 'Api/cartCookie'
import BurgerMenu from 'Component/BurgerMenu'
import Footer from 'Component/Footer'
import Header from 'Component/Header'
import MainBanner from 'Component/MenuBoardComponent/MainBanner'
import MainOrder from 'Component/MenuBoardComponent/MainOrder'
import { useCartModal } from 'Context/CartModalContext'
import {
  getRestaurant,
  restaurantContextDefaultValue,
  useRestaurantDispatch,
  useRestaurantState,
} from 'Context/restaurantContext'
import { FlexAlignCSS } from 'Styles/common'
import { Badge, Spin } from 'antd'
import React, { useEffect, useState } from 'react'

import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import CartModal from '../Component/Modal/CartModal'
import ErrorPage from './ErrorPage'

const MenuBoardPage: React.FC = () => {
  const [totalCartItems, setTotalCartItems] = useState(0)
  const { id } = useParams()
  if (id === undefined) throw new Error('id가 없습니다.')

  const dispatch = useRestaurantDispatch()
  const { data: restaurant, loading, error } = useRestaurantState().restaurant

  useEffect(() => {
    getRestaurant(dispatch, id)
  }, [dispatch, id])

  useEffect(() => {
    const updateTotalCartItems = () => {
      const totalItems = getTotalCartItems(restaurant?._id as string)
      setTotalCartItems(totalItems)
    }
    updateTotalCartItems()
    const intervalId = setInterval(updateTotalCartItems, 1000)
    return () => clearInterval(intervalId)
  }, [restaurant])
  const { openModal, isModalOpen } = useCartModal()

  if (loading) {
    return (
      <StyledSpin tip="Loading" size="large">
        <div className="content" />
      </StyledSpin>
    )
  }
  if (error) return <ErrorPage errorCode={500} />

  return (
    <div className="MenuBoard">
      {isModalOpen && <CartModal></CartModal>}
      <StyledContainer>
        <Header
          Left={<BurgerMenu />}
          HeaderName={restaurant ? restaurant.name : ''}
          Right={
            <>
              <StyledBadge count={totalCartItems}></StyledBadge>
              <StyledButton onClick={openModal}>
                <StyledH5>장바구니</StyledH5>
              </StyledButton>
            </>
          }
        />
        <StyledBanner
          images={
            restaurant && restaurant.banner_images
              ? restaurant.banner_images.map((banner_image) => {
                  return process.env.REACT_APP_STATIC_URL + banner_image.path
                })
              : []
          }
        />
        <StyledOrder info={restaurant ? restaurant : restaurantContextDefaultValue} />
      </StyledContainer>
      <Footer />
    </div>
  )
}

export default MenuBoardPage

const StyledContainer = styled.div`
  background-color: #fff;
`

const StyledBanner = styled(MainBanner)`
  margin: 0px;
  padding: 0px;
`

const StyledOrder = styled(MainOrder)`
  margin: 0px;
  padding: 0px;
`

const StyledButton = styled.button`
  ${FlexAlignCSS};
  color: inherit;
  padding: 0;
  border: none;
  background: none;
  cursor: pointer;
`

export const StyledSpin = styled(Spin)`
  &&& {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) scale(4);
  }
`

const StyledBadge = styled(Badge)`
  .ant-badge-count {
    height: 32pt;
    width: 32pt;
    line-height: 32pt;
    font-size: 1.5rem;
    border-radius: 50%;
  }
  transform: translate(400%, -40%) scale(1.3);
`

const StyledH5 = styled.h5`
  margin: 0;
  @media screen and (max-width: 440pt) {
    font-size: 2rem;
  }
`
