import { Restaurant } from 'Context/restaurantContext'
import React, { useEffect, useRef } from 'react'
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

  useEffect(() => {
    // 스크롤 이벤트 핸들러
    const handleScroll = () => {
      const menuSections = contentRefs.current.map((ref) => ref.current)
      let activeIndex = 0
      for (let i = 0; i < menuSections.length; i++) {
        const section = menuSections[i]
        if (section) {
          const rect = section.getBoundingClientRect()
          if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
            activeIndex = i
            break
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

  useEffect(() => {
    // `menutype`의 개수에 따라 `ref` 생성 및 초기화
    contentRefs.current = Array.from({ length: menutype.length }, () => React.createRef())
  }, [menutype.length])

  const onContentClick = (index: number) => {
    contentRefs.current[index].current?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div>
      <StyledUl>
        {menutype.map((type, index) => (
          <StyledLi key={index} $active={activeMenu === index} onClick={() => onContentClick(index)}>
            {type}
          </StyledLi>
        ))}
      </StyledUl>

      <MenuCardsContainer ref={content1Ref}>
        <div>
          <StyledLiEach>{menutype[0]}</StyledLiEach>
        </div>
        <MenuCard info={info.menus[0]} />
      </MenuCardsContainer>
      <MenuCardsContainer ref={content2Ref}>
        <div>
          <StyledLiEach>{menutype[1]}</StyledLiEach>
        </div>
        <MenuCard info={info.menus[0]} />
      </MenuCardsContainer>
      <MenuCardsContainer ref={content3Ref}>
        <div>
          <StyledLiEach>{menutype[2]}</StyledLiEach>
        </div>
        <MenuCard info={info.menus[0]} />
      </MenuCardsContainer>
      <MenuCardsContainer ref={content4Ref}>
        <div>
          <StyledLiEach>{menutype[3]}</StyledLiEach>
        </div>
        <MenuCard info={info.menus[0]} />
      </MenuCardsContainer>
      <DisclaimerContainer>
        <Disclaimer>
          유의사항
          <br />
          • 메뉴 사진은 연출된 이미지로 실제 조리된 음식과 다를 수 있습니다. <br />• 상단 메뉴 및 가격은 업소에서 제공한
          정보를 기준으로 작성되었으며 변동될 수 있습니다.
        </Disclaimer>
      </DisclaimerContainer>
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

const StyledLi = styled.li<{ $active: boolean }>`
  // active props 추가
  display: inline-block;
  padding: 16pt 12pt;
  font-weight: bold;
  color: ${(props) => (props.$active ? '#343434' : '#A9A9A9')}; // active props에 따라 색상 변경
`
const MenuCardsContainer = styled.div`
  align-items: center;
  padding: 16pt;
`

const StyledLiEach = styled.li`
  padding: 16pt 32pt;
  font-weight: bold;
`
const DisclaimerContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  background-color: #f2f2f2;
`
const Disclaimer = styled.div`
  font-size: 24px;
  color: #777;
  margin-top: 10px;
`
