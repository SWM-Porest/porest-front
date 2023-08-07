import { getTotalCartItems } from 'Api/cartCookie'
import Footer from 'Component/Footer'
import Header from 'Component/Header'
import MainBanner from 'Component/MenuBoardComponent/MainBanner'
import MainOrder from 'Component/MenuBoardComponent/MainOrder'
import { useCartModal } from 'Context/CartModalContext'
import {
  getRestaurant,
  restaurantContextDefaultValue,
  useRestauranDispatch,
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
  // const images = ['img/교동짬뽕.jpeg', 'img/메뉴판.jpeg', 'img/내부.jpeg']

  const { id } = useParams()
  if (id === undefined) throw new Error('id가 없습니다.')

  const dispatch = useRestauranDispatch()
  const { data: restaurant, loading, error } = useRestaurantState().restaurant

  useEffect(() => {
    getRestaurant(dispatch, id)
  }, [dispatch, id])

  const [totalCartItems, setTotalCartItems] = useState(0)

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
          HeaderName={restaurant ? restaurant.name : ''}
          Right={
            <Badge count={totalCartItems}>
              <StyledButton onClick={openModal}>
                <h5 style={{ margin: 0 }}>장바구니</h5>
              </StyledButton>
            </Badge>
          }
        />
        <StyledBanner images={restaurant ? restaurant.banner_image_urls : []} />
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
`
export const StyledSpin = styled(Spin)`
  &&& {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) scale(4);
  }
`
