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
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import CartModal from '../Component/Modal/CartModal'
import { FlexAlignCSS } from 'Styles/common'

const MenuBoardPage: React.FC = () => {
  const images = ['img/교동짬뽕.jpeg', 'img/메뉴판.jpeg', 'img/내부.jpeg']

  const { id } = useParams()
  if (id === undefined) throw new Error('id가 없습니다.')

  const dispatch = useRestauranDispatch()
  const { data: restaurant, loading, error } = useRestaurantState().restaurant

  useEffect(() => {
    getRestaurant(dispatch, id)
  }, [dispatch, id])

  const { openModal, isModalOpen } = useCartModal()

  if (loading) return <div>로딩중...</div>
  if (error) return <div>에러가 발생했습니다.</div>
  return (
    <div className="MenuBoard">
      {isModalOpen && <CartModal></CartModal>}
      <StyledContainer>
        <Header
          HeaderName={restaurant ? restaurant.name : ''}
          Right={
            <StyledButton onClick={openModal}>
              <h5 style={{ margin: 0 }}>주문내역</h5>
            </StyledButton>
          }
        />
        <StyledBanner images={images} />
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
