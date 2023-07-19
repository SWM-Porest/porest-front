import React from 'react'
import styled from 'styled-components'
interface OwnProps {
  img: string
  check: boolean
}
const StyledContainer = styled.div`
  text-align: center;
  align-items: center;
  padding: 30px;
  margin: 10px;
  font-size: 30px;
`
const StyledH3 = styled.h3`
  padding: 10px 0 10px 0;
  margin: 0px;
  font-family: 'Noto Serif KR', serif;
  text-align: center;
  background-color: #ecebeb;
  border-radius: 20px 20px 0 0;
`

const StyledImage = styled.img`
  width: 30%;
  padding: 20px;
`
const StyledMiniContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #f1f1f1;
  border-radius: 0 0 20px 20px;
`

const BoxContainer = styled.div`
  background-color: white;
  font-size: 35px;
  border-radius: 20px;
  margin: 10px;
`
const CheckBox: React.FC = () => {
  return (
    <StyledContainer>
      <StyledH3>어디서 드시나요?</StyledH3>
      <StyledMiniContainer>
        <CheckMiniBox img="img/dining-room.png" check={true} />
        <CheckMiniBox img="img/packaging.png" check={false} />
      </StyledMiniContainer>
    </StyledContainer>
  )
}

export default CheckBox

const CheckMiniBox: React.FC<OwnProps> = ({ img, check }) => {
  if (check) {
    return (
      <BoxContainer>
        <StyledImage src={img} alt="포장 여부 이미지" />
        <p>매장에서 먹고 갈게요</p>
      </BoxContainer>
    )
  }
  return (
    <BoxContainer>
      <StyledImage src={img} alt="포장 여부 이미지" />
      <p>포장해서 가져갈게요</p>
    </BoxContainer>
  )
}
