import React from 'react'
import styled from 'styled-components'

interface HeaderProps {
  Left?: React.ReactNode | undefined
  HeaderName: string
  Right?: React.ReactNode | undefined
}

const Header: React.FC<HeaderProps> = ({ Left, HeaderName, Right }) => {
  return (
    <StyledNavbar>
      <LeftDiv>{Left == undefined ? <span style={{ width: 120 }} /> : Left}</LeftDiv>
      <CenterDiv>
        <HeaderNameText>{HeaderName}</HeaderNameText>
      </CenterDiv>
      <RightDiv>{Right == undefined ? <span style={{ width: 120 }} /> : Right}</RightDiv>
    </StyledNavbar>
  )
}

export default Header

export const StyledNavbar = styled.nav`
  display: flex;
  justify-content: space-between; /* 영역들 간의 공간을 동일하게 분배 */
  align-items: center; /* 세로 방향으로 가운데 정렬 */
  padding: 1rem 1.2rem;
  background-color: ${({ theme }) => theme.COLOR.common.white[0]};
`

const LeftDiv = styled.div`
  flex: 1; /* 동등한 공간 차지 */
  display: flex;
  justify-content: start; /* 가운데 정렬 */
`

const CenterDiv = styled.div`
  flex: 1; /* 동등한 공간 차지 */
  display: flex;
  justify-content: center; /* 가운데 정렬 */
`

const RightDiv = styled.div`
  flex: 1; /* 동등한 공간 차지 */
  display: flex;
  justify-content: end; /* 가운데 정렬 */
  white-space: nowrap; /* 텍스트 줄바꿈 방지 */
`

const HeaderNameText = styled.h3`
  font-size: 1.8rem;
  margin: 0;
  cursor: default;
  white-space: nowrap; /* 텍스트 줄바꿈 방지 */
`
