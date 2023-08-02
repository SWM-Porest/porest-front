import { MenuModal } from 'Component/MenuComponent/MenuModal'
import { Restaurant } from 'Context/restaurantContext'
import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import MenuCard from './MenuCard'

interface OwnProps {
  info: Restaurant
}

const MainOrder: React.FC<OwnProps> = ({ info }) => {
  const [menuId, setMenuId] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const openModalHandler = (id: string) => {
    setMenuId(id)
    setIsOpen(!isOpen)
  }

  // 중복되지 않은 메뉴 타입 추출
  const uniqueMenuTypes = info.menus.reduce((types: string[], menu) => {
    if (!types.includes(menu.menutype)) {
      types.push(menu.menutype)
    }
    return types
  }, [])

  // Ref 배열을 동적 생성
  const contentRefs = uniqueMenuTypes.map(() => useRef<HTMLDivElement>(null))

  const [activeMenuIndex, setActiveMenuIndex] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const menuSections = contentRefs.map((ref) => ref.current)
      let activeIndex = menuSections.length - 1 // 가장 마지막 인덱스로 초기화해서 더 내려갔을 때 index0이 밝혀지지 않도록
      for (let i = 0; i < menuSections.length; i++) {
        const section = menuSections[i]
        if (section) {
          const rect = section.getBoundingClientRect()
          if (rect.top >= 0 && rect.top <= window.innerHeight) {
            activeIndex = i
          }
        }
      }
      setActiveMenuIndex(activeIndex)
    }

    // 스크롤 이벤트 리스너 등록
    window.addEventListener('scroll', handleScroll)

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <div>
      <StyledUl>
        {uniqueMenuTypes.map((menuType, index) => (
          <StyledLi
            key={index}
            $active={activeMenuIndex === index}
            onClick={() => contentRefs[index].current?.scrollIntoView({ behavior: 'smooth' })}
          >
            {menuType}
          </StyledLi>
        ))}
      </StyledUl>
      <MenuModal
        id={menuId}
        isOpen={isOpen}
        openModalHandler={() => {
          openModalHandler(menuId)
        }}
      />
      {uniqueMenuTypes.map((menuType, index) => (
        <div key={`menuType_${index}`}>
          <MenuCardsContainer ref={contentRefs[index]}>
            <div>
              <StyledLiEach>{menuType}</StyledLiEach>
            </div>

            {info.menus.map((menu) =>
              menu.menutype === menuType && menu._id ? ( // menu._id가 유효한 경우에만 렌더링
                <div
                  key={`menu_${menu._id}`}
                  onClick={() => {
                    openModalHandler(menu._id)
                  }}
                >
                  <MenuCard key={menu._id} info={menu} />
                </div>
              ) : null,
            )}
          </MenuCardsContainer>
        </div>
      ))}

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
  padding: 24pt 48pt;
  display: block;
  border-bottom: solid;
  border-color: ${({ theme }) => theme.COLOR.common.gray[600]};
`

const StyledLi = styled.li<{ $active: boolean }>`
  // active props 추가
  display: inline-block;
  padding: 16pt 40pt 0 0;
  font-weight: bold;
  color: ${(props) => (props.$active ? '#343434' : '#A9A9A9')}; // active props에 따라 색상 변경
`

const MenuCardsContainer = styled.div`
  align-items: center;
`

const StyledLiEach = styled.li`
  padding: 24pt 48pt;
  font-weight: bold;
`

const DisclaimerContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  background-color: #f2f2f2;
  font-family: 'Noto Sans KR', sans-serif;
`

const Disclaimer = styled.div`
  font-size: 24px;
  color: #777;
  margin-top: 10px;
`
