import { setCookie } from 'Api/cartCookie'
import AmountCheck from 'Component/AmountCheck'
import { Menu, useRestaurantState } from 'Context/restaurantContext'
import React, { useState } from 'react'
import styled from 'styled-components'
interface OwnProps {
  info: Menu
  cnt: number
}
const MenuPriceCard: React.FC<OwnProps> = ({ info, cnt }) => {
  const { data: restaurant } = useRestaurantState().restaurant
  const [count, setCount] = useState(cnt)
  const handleQuantity = (type: string) => {
    if (type === 'plus') {
      setCount(count + 1)
      setCookie(restaurant?._id as string, info, 1)
    } else {
      if (count === 1) return
      setCount(count - 1)
      setCookie(restaurant?._id as string, info, -1)
    }
  }
  return (
    <div>
      {info.img !== '' ? (
        <StyledContainer>
          <StyledImage src={info.img} alt="메뉴 이미지" />

          <OuterContainer>
            <StyledName>{info.name}</StyledName>
            <InnerContainer>
              <StyledAmountContainer>
                <AmountCheck count={count} handleQuantity={handleQuantity} />
              </StyledAmountContainer>
              <StyledPrice>{info.price * cnt}원</StyledPrice>
            </InnerContainer>
          </OuterContainer>
        </StyledContainer>
      ) : (
        <div></div>
      )}
    </div>
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

const StyledAmountContainer = styled.div`
  float: left;
  margin-top: 16pt;
`
const StyledPrice = styled.h5`
  float: right;
  text-align: right;
  display: block;
  margin-top: 24pt;
  color: ${({ theme }) => theme.COLOR.number_price};
`
