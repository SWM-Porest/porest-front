import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { removeCookie, setCookie } from 'Api/cartCookie'
import { CloseButton, CloseButtonContainer } from 'Component/Modal/CartModal'
import { Menu, useRestaurantState } from 'Context/restaurantContext'
import AmountCheck from 'Utils/AmountCheck'
import getImageSrc from 'Utils/getImageSrc'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

interface OwnProps {
  info: Menu
  orderinfo: { count: number; menu_id: string }
  handlePriceTotalChange: () => void
}

const MenuPriceCard: React.FC<OwnProps> = ({ info, orderinfo, handlePriceTotalChange }) => {
  const { data: restaurant } = useRestaurantState().restaurant
  const [count, setCount] = useState(orderinfo.count)
  const [totalprice, setTotalPrice] = useState((info.price * count).toLocaleString())
  const price = info.price.toLocaleString()
  const handleIncrement = () => {
    const newCount = count + 1
    setCount(newCount)
    setCookie(restaurant?._id as string, info, 1, info.options)
    handlePriceTotalChange()
  }

  const handleDecrement = () => {
    if (count > 1) {
      const newCount = count - 1
      setCount(newCount)
      setCookie(restaurant?._id as string, info, -1, info.options)
      handlePriceTotalChange()
    } else {
      removeCookie(restaurant?._id as string, info._id)
      handlePriceTotalChange()
    }
  }

  const handleRemoveMenu = () => {
    removeCookie(restaurant?._id as string, info._id)
    handlePriceTotalChange()
  }
  const optionPricesSum = info.options.reduce((acc, option) => {
    const itemPricesSum = option.items.reduce((itemAcc, item) => itemAcc + item.price, 0)
    return acc + itemPricesSum
  }, 0)

  useEffect(() => {
    const newTotalPrice = ((info.price + optionPricesSum) * count).toLocaleString()
    setTotalPrice(newTotalPrice)
  }, [count, info.price, optionPricesSum])

  return (
    <StyledContainer>
      <StyledImage src={getImageSrc(info.img)} alt="메뉴 이미지" />
      <OuterContainer>
        <TopContainer>
          <StyledName>{info.name}</StyledName>
          <CloseButtonContainer>
            <CloseButton icon={faXmark} onClick={handleRemoveMenu} size="2xl" />
          </CloseButtonContainer>
        </TopContainer>
        <StyledPrice>{price}원</StyledPrice>
        {info.options.map((option, index) => (
          <div key={index}>
            <h6 style={{ margin: 0, padding: '8pt 0' }}>{option.name}</h6>
            {option.items.map((item, index) => (
              <LargeButton key={index}>
                <span>{item.name}</span>
                <StyledOptionPrice>+ {item.price}</StyledOptionPrice>
              </LargeButton>
            ))}
          </div>
        ))}
        <InnerContainer>
          <StyledAmountContainer>
            <AmountCheck count={count} handleIncrement={handleIncrement} handleDecrement={handleDecrement} />
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
  border-color: ${({ theme }) => theme.COLOR.common.gray[700]};
  cursor: default;
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
const LargeButton = styled.div`
  padding: 8pt 0;
  font-size: 1.8rem;
`
const StyledOptionPrice = styled.span`
  float: right;
  color: ${({ theme }) => theme.COLOR.number_price};
`
