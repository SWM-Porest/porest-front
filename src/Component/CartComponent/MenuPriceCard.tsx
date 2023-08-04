import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { removeCookie, setCookie } from 'Api/cartCookie'
import AmountCheck from 'Component/AmountCheck'
import { CloseButton, CloseButtonContainer } from 'Component/Modal/CartModal'
import { Menu, useRestaurantState } from 'Context/restaurantContext'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

interface OwnProps {
  info: Menu
  cnt: number
  handlePriceTotalChange: () => void
}

const MenuPriceCard: React.FC<OwnProps> = ({ info, cnt, handlePriceTotalChange }) => {
  const { data: restaurant } = useRestaurantState().restaurant
  const [count, setCount] = useState(cnt)
  const [totalprice, setTotalPrice] = useState((info.price * count).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','))
  const price = info.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  const defaultImg = '/img/회색.png'

  const handleQuantity = (type: string) => {
    let newCount
    if (type === 'plus') {
      newCount = count + 1
    } else {
      newCount = count > 1 ? count - 1 : 1
    }
    setCount(newCount)
    if (type !== 'plus' && count === 1) {
      removeCookie(restaurant?._id as string, info._id)
    } else {
      setCookie(restaurant?._id as string, info, type === 'plus' ? 1 : -1)
    }
    handlePriceTotalChange()
  }
  const handleRemoveMenu = () => {
    removeCookie(restaurant?._id as string, info._id)
    handlePriceTotalChange()
  }
  useEffect(() => {
    setTotalPrice((info.price * count).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','))
  }, [count, info.price])

  return (
    <StyledContainer>
      {info.img.path !== '' ? (
        <StyledImage src={process.env.REACT_APP_STATIC_URL + info.img.path} alt="메뉴 이미지" />
      ) : (
        <StyledImage src={defaultImg} alt="메뉴 이미지" />
      )}
      <OuterContainer>
        <TopContainer>
          <StyledName>{info.name}</StyledName>
          <CloseButtonContainer>
            <CloseButton icon={faXmark} onClick={handleRemoveMenu} size="2xl" />
          </CloseButtonContainer>
        </TopContainer>

        <StyledPrice>{price}원</StyledPrice>
        <InnerContainer>
          <StyledAmountContainer>
            <AmountCheck count={count} handleQuantity={handleQuantity} />
          </StyledAmountContainer>
          <StyledTotalPrice>{totalprice}원</StyledTotalPrice>
        </InnerContainer>
      </OuterContainer>
    </StyledContainer>
  )
}

export default MenuPriceCard

const StyledContainer = styled.div`
  position: relative;
  padding: 24pt 48pt;
  border-top: ridge;
  border-color: ${({ theme }) => theme.COLOR.common.gray[600]};
`

const StyledImage = styled.img`
  display: flex;
  position: relative;
  float: left;
  width: 120pt;
  height: 112pt;
  border-radius: 8pt;
  margin-right: 32pt;
`
const TopContainer = styled.div`
  display: flex;
  justify-content: space-between;
`
const OuterContainer = styled.div`
  overflow: hidden;
`

const InnerContainer = styled.div`
  margin-top: 16pt;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const StyledName = styled.h4`
  display: flex;
  align-items: center;
  margin: 0;
`

const StyledPrice = styled.h5`
  margin: 0;
  padding: 16pt 0;
`

const StyledAmountContainer = styled.div`
  margin-top: 16pt;
  display: flex;
`

const StyledTotalPrice = styled.h5`
  float: right;
  text-align: right;
  display: block;
  margin-top: 24pt;
  color: ${({ theme }) => theme.COLOR.number_price};
`
