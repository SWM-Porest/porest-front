import { removeCookie, setCookie } from 'Api/cartCookie'
import { Menu, useRestaurantState } from 'Context/restaurantContext'
import AmountCheck from 'Utils/AmountCheck'
import getImageSrc from 'Utils/getImageSrc'
import { ReactComponent as Dismiss } from 'assets/Dismiss.svg'
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
      <MenuInfoContainer>
        <MenuInfoImageContainer>
          <StyledImage src={getImageSrc(info.img)} alt="메뉴 이미지" />
          <MenuInfoDetailsContainer>
            <MenuName>{info.name}</MenuName>
            {info.options.map((option, index) => (
              <MenuOption key={index}>
                <span style={{ margin: 0, padding: '8pt 0' }}>{option.name}:</span>
                {option.items.map((item, index) => (
                  <span key={index}> {item.name}</span>
                ))}
              </MenuOption>
            ))}
          </MenuInfoDetailsContainer>
        </MenuInfoImageContainer>
        <Dismiss width="2.4rem" height="2.4rem" onClick={handleRemoveMenu} />
      </MenuInfoContainer>

      <MenuPriceContainer>
        <AmountCheck count={count} handleIncrement={handleIncrement} handleDecrement={handleDecrement} />
        <TotalPrice>{totalprice}원</TotalPrice>
      </MenuPriceContainer>
    </StyledContainer>
  )
}

export default MenuPriceCard

const StyledContainer = styled.div`
  display: inline-flex;
  padding: 1.6rem 2rem;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.6rem;
  background-color: ${({ theme }) => theme.COLOR.common.white[0]};
`

const StyledImage = styled.img`
  width: 6rem;
  height: 6rem;
  border-radius: 1.2rem;
`

const MenuInfoContainer = styled.div`
  display: flex;
  width: 350px;
  justify-content: space-between;
  align-items: center;
`

const MenuPriceContainer = styled.div`
  display: flex;
  width: 350px;
  justify-content: space-between;
  align-items: center;
`

const MenuInfoImageContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`

const MenuInfoDetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
`

const MenuName = styled.h4`
  color: ${({ theme }) => theme.COLOR.common.gray[20]};
  font-style: normal;
  font-weight: 500;
  margin: 0;
`

const MenuOption = styled.div`
  color: ${({ theme }) => theme.COLOR.common.gray[40]};
  font-size: 1.4rem;
  font-style: normal;
  font-weight: 400;
`

const TotalPrice = styled.h3`
  margin: 0;
  color: ${({ theme }) => theme.COLOR.common.gray[20]};
  text-align: right;
  font-style: normal;
  font-weight: 500;
`
