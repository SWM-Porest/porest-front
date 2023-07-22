import { Restaurant } from 'model/restaurant'
import { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import MenuCard from './MenuCard'
const menutype = ['요리류', '식사류', '주류', '세트메뉴']

interface OwnProps {
  info: Restaurant
}

const MainOrder: React.FC<OwnProps> = ({ info }) => {
  const content1Ref = useRef<HTMLDivElement>(null)
  const content2Ref = useRef<HTMLDivElement>(null)
  const content3Ref = useRef<HTMLDivElement>(null)
  const content4Ref = useRef<HTMLDivElement>(null)

  const [activeMenu, setActiveMenu] = useState(0) // activeMenu state 추가
  useEffect(() => {
    // 스크롤 이벤트 핸들러
    const handleScroll = () => {
      //이렇게 말공~ 네,,,,
      const menuSections = [content1Ref.current, content2Ref.current, content3Ref.current, content4Ref.current]
      let activeIndex = 0
      for (let i = 0; i < menuSections.length; i++) {
        const section = menuSections[i]
        if (section) {
          const rect = section.getBoundingClientRect()
          if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
            activeIndex = i
          }
        }
      }

      setActiveMenu(activeIndex)
    }

    // 스크롤 이벤트 리스너 등록
    window.addEventListener('scroll', handleScroll)

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const onContent1Click = () => {
    content1Ref.current?.scrollIntoView({ behavior: 'smooth' })
    setActiveMenu(0) // 클릭 시 activeMenu 상태 변경
  }
  const onContent2Click = () => {
    content2Ref.current?.scrollIntoView({ behavior: 'smooth' })
    setActiveMenu(1) // 클릭 시 activeMenu 상태 변경
  }
  const onContent3Click = () => {
    content3Ref.current?.scrollIntoView({ behavior: 'smooth' })
    setActiveMenu(2) // 클릭 시 activeMenu 상태 변경
  }
  const onContent4Click = () => {
    content4Ref.current?.scrollIntoView({ behavior: 'smooth' })
    setActiveMenu(3) // 클릭 시 activeMenu 상태 변경
  }

  return (
    <div>
      <StyledUl>
        <StyledLi active={activeMenu === 0} onClick={onContent1Click}>
          {menutype[0]}
        </StyledLi>
        <StyledLi active={activeMenu === 1} onClick={onContent2Click}>
          {menutype[1]}
        </StyledLi>
        <StyledLi active={activeMenu === 2} onClick={onContent3Click}>
          {menutype[2]}
        </StyledLi>
        <StyledLi active={activeMenu === 3} onClick={onContent4Click}>
          {menutype[3]}
        </StyledLi>
      </StyledUl>

      <MenuCardsContainer ref={content1Ref}>
        <div>
          <StyledLiEach>{menutype[0]}</StyledLiEach>
        </div>
        <MenuCard info={info.menu[0]} />
        <MenuCard info={info.menu[1]} />
        <MenuCard info={info.menu[2]} />
      </MenuCardsContainer>
      <MenuCardsContainer ref={content2Ref}>
        <div>
          <StyledLiEach>{menutype[1]}</StyledLiEach>
        </div>
        <MenuCard info={info.menu[0]} />
        <MenuCard info={info.menu[1]} />
      </MenuCardsContainer>
      <MenuCardsContainer ref={content3Ref}>
        <div>
          <StyledLiEach>{menutype[2]}</StyledLiEach>
        </div>
        <MenuCard info={info.menu[2]} />
        <MenuCard info={info.menu[2]} />
        <MenuCard info={info.menu[2]} />
        <MenuCard info={info.menu[2]} />
      </MenuCardsContainer>
      <MenuCardsContainer ref={content4Ref}>
        <div>
          <StyledLiEach>{menutype[3]}</StyledLiEach>
        </div>
        <MenuCard info={info.menu[2]} />
        <MenuCard info={info.menu[2]} />
        <MenuCard info={info.menu[2]} />
        <MenuCard info={info.menu[2]} />
      </MenuCardsContainer>
    </div>
  )
}
export default MainOrder

const StyledUl = styled.ul`
  position: sticky;
  top: 0;

  background-color: #fff;
  list-style: none;

  padding: 16pt;
  display: block;
  padding-inline-start: 40pt;
  border-bottom: solid;
  border-color: ${({ theme }) => theme.COLOR.common.gray[600]};
`

const StyledLi = styled.li<{ active: boolean }>`
  // active props 추가
  display: inline-block;
  padding: 16pt 12pt;
  font-weight: bold;
  color: ${(props) => (props.active ? '#343434' : '#A9A9A9')}; // active props에 따라 색상 변경
`
const MenuCardsContainer = styled.div`
  align-items: center;
  padding: 16pt;
`

const StyledLiEach = styled.li`
  padding: 16pt 32pt;
  font-weight: bold;
`
