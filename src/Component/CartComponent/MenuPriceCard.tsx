import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { removeCookie, setCookie } from 'Api/cartCookie'
import AmountCheck from 'Component/AmountCheck'
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
      {info.img !== '' ? (
        <StyledImage src={info.img} alt="메뉴 이미지" />
      ) : (
        <StyledImage src={defaultImg} alt="메뉴 이미지" />
      )}
      <OuterContainer>
        <CloseButtonContainer>
          <CloseButton icon={faXmark} onClick={handleRemoveMenu} size="2xl" />
        </CloseButtonContainer>
        <StyledName>{info.name}</StyledName>

        <StyledPrice>{price}</StyledPrice>
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
  display: block;
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

const OuterContainer = styled.div`
  display: block;
  overflow: hidden;
`

const InnerContainer = styled.div`
  overflow: hidden;
  margin-top: 16pt;
  display: block;
`

const StyledName = styled.h4`
  display: block;
  padding-right: 48pt;
  margin: 0;
`

const StyledPrice = styled.h5`
  display: block;
  padding-right: 48pt;
  margin: 0;
  padding: 16pt 0;
`

const StyledAmountContainer = styled.div`
  float: left;
  margin-top: 16pt;
`

const StyledTotalPrice = styled.h5`
  float: right;
  text-align: right;
  display: block;
  margin-top: 24pt;
  color: ${({ theme }) => theme.COLOR.number_price};
`

const CloseButtonContainer = styled.div`
  width: 72px;
  height: 72px;
  border-radius: 50%;
  justify-content: center;
  align-items: center;
  transition: background 0.3s ease-in-out;
  float: right;
  text-align: right;
  display: block;
  &:hover {
    background: #1d9255;
  }
`

const CloseButton = styled(FontAwesomeIcon)`
  border: none;
  cursor: pointer;
  width: 54px;
  height: 54px;
  color: #c5c9cc;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
`
