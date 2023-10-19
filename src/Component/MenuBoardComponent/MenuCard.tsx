import { Menu } from 'Context/restaurantContext'
import React from 'react'
import styled from 'styled-components'
import getImageSrc from 'Utils/getImageSrc'
interface OwnProps {
  info: Menu
}

const MenuCard: React.FC<OwnProps> = ({ info }) => {
  const price = info.price.toLocaleString()
  return (
    <div>
      {info.img ? (
        <MenuCardContainer>
          <StyledImage src={getImageSrc(info.img)} alt="메뉴 이미지" />
          <StyledText>
            <StyledName>{info.name}</StyledName>
            <StyledDes>{info.description}</StyledDes>
            <StyledPrice>{price}원</StyledPrice>
          </StyledText>
        </MenuCardContainer>
      ) : (
        <MenuCardContainer>
          <StyledText>
            <StyledName>{info.name}</StyledName>
            <StyledDes>{info.description}</StyledDes>
            <StyledPrice>{price}원</StyledPrice>
          </StyledText>
        </MenuCardContainer>
      )}
    </div>
  )
}
export default MenuCard

const MenuCardContainer = styled.div`
  display: flex;
  padding: 1.2rem 0;
  align-items: flex-start;
  gap: 1.6rem;

  color: inherit;
  text-decoration: none;

  border-top: ridge;
  border-color: ${({ theme }) => theme.COLOR.common.gray[700]};
  cursor: pointer;
`

const StyledImage = styled.img`
  width: 10.8rem;
  aspect-ratio: 1/1;

  border-radius: 1.2rem;
  background: url(<path-to-image>), lightgray 50% / cover no-repeat;
`

const StyledText = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  align-self: stretch;
`

const StyledName = styled.h4`
  margin: 0;
  color: ${({ theme }) => theme.COLOR.common.gray[20]};
  font-style: normal;
  font-weight: 600;
`

const StyledDes = styled.h5`
  color: ${({ theme }) => theme.COLOR.common.gray[40]};
  font-size: 1.4rem;
  font-style: normal;
  font-weight: 400;
  margin: 0;
`

const StyledPrice = styled.h4`
  color: ${({ theme }) => theme.COLOR.common.gray[20]};
  font-style: normal;
  font-weight: 700;
  margin: 0;
`
