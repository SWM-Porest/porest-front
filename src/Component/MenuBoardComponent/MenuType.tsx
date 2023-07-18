import React from 'react'
import styled from 'styled-components'
interface OwnProps {
  img: string
  typename: string
}
const StyledContainer = styled.div`
  display: flex;
  text-align: center;
  align-items: center;
  padding: 30px;
  margin: 10px;
  font-size: 30px;
`
const BoxContainer = styled.div`
  background-color: white;
  font-size: 35px;
  border-radius: 20px;
  margin: 10px;
`
const StyledImage = styled.img`
  width: 20%;
  padding: 20px;
`

const MenuType: React.FC = () => {
  return (
    <StyledContainer>
      <TypeMiniBox img="img/식사류.png" typename="식사류" />
      <TypeMiniBox img="img/요리류.png" typename="요리류" />
      <TypeMiniBox img="img/주류.png" typename="주류" />
      <TypeMiniBox img="img/세트메뉴.png" typename="세트메뉴" />
    </StyledContainer>
  )
}

export default MenuType

const TypeMiniBox: React.FC<OwnProps> = ({ img, typename }) => {
  return (
    <BoxContainer>
      <StyledImage src={img} alt="포장 여부 이미지" />
      <p>{typename}</p>
    </BoxContainer>
  )
}
