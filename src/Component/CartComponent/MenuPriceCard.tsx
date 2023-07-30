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

  const handleQuantity = (type: string) => {
    let newCount
    if (type === 'plus') {
      newCount = count + 1
    } else {
      // 쿠키에 있는 값이 1일 때는 더이상 감소하지 않도록 처리
      newCount = count > 1 ? count - 1 : 1 // 이 부분을 수정하였습니다.
    }
    setCount(newCount)
    // 감소할 때, 쿠키에 있는 값이 1인 경우에는 메뉴를 삭제하도록 처리
    if (type !== 'plus' && count === 1) {
      removeCookie(restaurant?._id as string, info._id)
    } else {
      setCookie(restaurant?._id as string, info, type === 'plus' ? 1 : -1)
    }
    handlePriceTotalChange()
  }
  const handleRemoveMenu = () => {
    removeCookie(restaurant?._id as string, info._id) // 특정 메뉴를 쿠키에서 제거
    handlePriceTotalChange() // 가격 업데이트
  }
  useEffect(() => {
    setTotalPrice((info.price * count).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','))
  }, [count, info.price])

  return (
    <StyledContainer>
      {info.img !== '' && <StyledImage src={info.img} alt="메뉴 이미지" />}
      <OuterContainer>
        <StyledName>{info.name}</StyledName>
        <StyledPrice>{price}</StyledPrice>
        <InnerContainer>
          <StyledAmountContainer>
            <AmountCheck count={count} handleQuantity={handleQuantity} />
          </StyledAmountContainer>
          <StyledTotalPrice>{totalprice}원</StyledTotalPrice>
        </InnerContainer>
        <StyledRemoveButton onClick={handleRemoveMenu}>X</StyledRemoveButton>
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

const StyledRemoveButton = styled.button``
