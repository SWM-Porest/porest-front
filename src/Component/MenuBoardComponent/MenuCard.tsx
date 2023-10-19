import { Menu } from 'Context/restaurantContext'
import React from 'react'
import styled from 'styled-components'
import { FlexAlignCSS } from 'Styles/common'
interface OwnProps {
  info: Menu
}

const MenuCard: React.FC<OwnProps> = ({ info }) => {
  const price = info.price.toLocaleString()
  return (
    <div>
      {info.img ? (
        <MenuCardContainer>
          <StyledImage src={process.env.REACT_APP_STATIC_URL + info.img.path} alt="메뉴 이미지" />
          <div>
            <ImgStyledName>{info.name}</ImgStyledName>
            <ImgStyledPrice>{price}원</ImgStyledPrice>
          </div>
        </MenuCardContainer>
      ) : (
        <MenuCardContainer>
          <div>
            <StyledName>{info.name}</StyledName>
            <StyledPrice>{price}원</StyledPrice>
          </div>
        </MenuCardContainer>
      )}
    </div>
  )
}
export default MenuCard

const MenuCardContainer = styled.div`
  ${FlexAlignCSS};
  padding: 24pt 48pt;
  color: inherit;
  text-decoration: none;
  border-top: ridge;
  border-color: ${({ theme }) => theme.COLOR.common.gray[700]};
  cursor: pointer;
`

const StyledImage = styled.img`
  display: block;
  width: 200pt;
  height: 192pt;
  border-radius: 8pt;
`

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
