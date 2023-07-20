import { Restaurant } from 'model/restaurant'
import { useRef } from 'react'
import styled from 'styled-components'
import MenuCard from './MenuCard'
const menutype = ['요리류', '식사류', '주류', '세트메뉴']

interface OwnProps {
  info: Restaurant
}

const StyledContainer = styled.div`
  background-color: #fff;
  display: block;
`
const StyledUl = styled.ul`
  position: sticky;
  box-sizing: border-box;
  top: 0;
  background-color: #1d1b1b;
  white-space: nowrap;
  list-style: none;

  margin: 0;
  padding: 20px;
  -webkit-text-size-adjust: none;
  display: block;

  padding-inline-start: 40px;
  box-shadow: 0 5px 5px -2px gray;
`

const StyledLi = styled.li`
  font-family: 'Noto Serif KR', serif;
  display: inline-block;
  margin-left: 18px;
  padding: 20px 12px 20px 12px;
  line-height: 29px;
  font-weight: bold;
  font-size: 40px;
  color: #f6edd9;
  &:hover {
    transform: translateY(-4px);
    transition: 1s;
  }
`
const H2Container = styled.div`
  border-bottom: ridge;
  margin-bottom: 20px;
`
const StyledH2 = styled.h2`
  margin: 0px;
  font-family: 'Noto Serif KR', serif;

  background-color: #fff;
  font-size: 40px;
  line-height: 50px;
  padding: 12px 12px 12px 40px;
`

const MenuCardsContainer = styled.div`
  align-items: center;
  padding: 30px;
`

const MainOrder: React.FC<OwnProps> = ({ info }) => {
  const content1Ref = useRef<HTMLDivElement>(null)
  const content2Ref = useRef<HTMLDivElement>(null)
  const content3Ref = useRef<HTMLDivElement>(null)
  const content4Ref = useRef<HTMLDivElement>(null)
  const content5Ref = useRef<HTMLDivElement>(null)

  const onContent1Click = () => {
    content1Ref.current?.scrollIntoView({ behavior: 'smooth' })
  }
  const onContent2Click = () => {
    content2Ref.current?.scrollIntoView({ behavior: 'smooth' })
  }
  const onContent3Click = () => {
    content3Ref.current?.scrollIntoView({ behavior: 'smooth' })
  }
  const onContent4Click = () => {
    content4Ref.current?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <StyledContainer>
      <StyledUl>
        <StyledLi onClick={onContent1Click}>{menutype[0]}</StyledLi>
        <StyledLi onClick={onContent2Click}>{menutype[1]}</StyledLi>
        <StyledLi onClick={onContent3Click}>{menutype[2]}</StyledLi>
        <StyledLi onClick={onContent4Click}>{menutype[3]}</StyledLi>
      </StyledUl>

      <MenuCardsContainer ref={content1Ref}>
        <H2Container>
          <StyledH2>{menutype[0]}</StyledH2>
        </H2Container>
        <MenuCard info={info.menu[0]} />
        <MenuCard info={info.menu[1]} />
        <MenuCard info={info.menu[2]} />
      </MenuCardsContainer>
      <MenuCardsContainer ref={content2Ref}>
        <H2Container>
          <StyledH2>{menutype[1]}</StyledH2>
        </H2Container>
        <MenuCard info={info.menu[0]} />
        <MenuCard info={info.menu[1]} />
      </MenuCardsContainer>
      <MenuCardsContainer ref={content3Ref}>
        <H2Container>
          <StyledH2>{menutype[2]}</StyledH2>
        </H2Container>
        <MenuCard info={info.menu[2]} />
        <MenuCard info={info.menu[2]} />
        <MenuCard info={info.menu[2]} />
        <MenuCard info={info.menu[2]} />
      </MenuCardsContainer>
      <MenuCardsContainer ref={content4Ref}>
        <H2Container>
          <StyledH2>{menutype[3]}</StyledH2>
        </H2Container>
        <MenuCard info={info.menu[2]} />
        <MenuCard info={info.menu[2]} />
        <MenuCard info={info.menu[2]} />
        <MenuCard info={info.menu[2]} />
      </MenuCardsContainer>
    </StyledContainer>
  )
}
export default MainOrder
