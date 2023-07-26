import { Menu } from 'Context/restaurantContext'
import React from 'react'
import styled from 'styled-components'
import { FlexAlignCSS } from 'Styles/common'
interface OwnProps {
  info: Menu
}

const MenuCard: React.FC<OwnProps> = ({ info }) => {
  console.log(info.img, info)
  return (
    <div>
      {info.img ? (
        <MenuCardContainer>
          <StyledImage src={info.img} alt="메뉴 이미지" />
          <StyledContainer>
            <ImgStyledName>{info.name}</ImgStyledName>
            <ImgStyledPrice>{info.price}원</ImgStyledPrice>
          </StyledContainer>
        </MenuCardContainer>
      ) : (
        <MenuCardContainer>
          <div>
            <StyledName>{info.name}</StyledName>
            <StyledPrice>{info.price}원</StyledPrice>
          </div>
        </MenuCardContainer>
      )}
    </div>
  )
}
export default MenuCard

const MenuCardContainer = styled.div`
  ${FlexAlignCSS};
  padding: 16pt 32pt;
  color: inherit;
  text-decoration: none;
  border-top: ridge;
  border-color: ${({ theme }) => theme.COLOR.common.gray[600]};
`

const StyledImage = styled.img`
  display: block;
  width: 200pt;
  height: 192pt;
  border-radius: 8pt;
`
const StyledContainer = styled.div``
const ImgStyledName = styled.h4`
  padding: 8pt 56pt;

  margin: 0;
`
const ImgStyledPrice = styled.h5`
  padding: 8pt 56pt;

  margin: 0;
  color: ${({ theme }) => theme.COLOR.number_price};
`
const StyledName = styled.h4`
  padding: 8pt 32pt;
  margin: 0;
`
const StyledPrice = styled.h5`
  padding: 8pt 32pt;
  margin: 0;
  color: ${({ theme }) => theme.COLOR.number_price};
`
