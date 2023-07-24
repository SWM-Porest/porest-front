import { Menu } from 'model/restaurant'
import React from 'react'
import styled from 'styled-components'
interface OwnProps {
  info: Menu
}
const MenuPriceCard: React.FC<OwnProps> = ({ info }) => {
  return (
    <div>
      {info.img !== '' ? (
        <StyledContainer>
          <StyledImage src={info.img} alt="메뉴 이미지" />

          <OuterContainer>
            <ImgStyledName>{info.name}</ImgStyledName>
            <InnerContainer>
              <ImgStyledCount>개수</ImgStyledCount>
              <ImgStyledPrice>{info.price}원</ImgStyledPrice>
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

const ImgStyledName = styled.h4`
  display: block;
  padding-right: 48pt;

  margin: 0;
`

const ImgStyledCount = styled.h5`
  float: left;
  margin-top: 16pt;
`
const ImgStyledPrice = styled.h5`
  float: right;
  text-align: right;
  display: block;
  margin: 0;
  color: ${({ theme }) => theme.COLOR.number_price};
`
