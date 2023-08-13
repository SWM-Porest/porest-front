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
    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = contentRefs.findIndex((ref) => ref.current === entry.target)
          setActiveMenuIndex(index)
        }
      })
    }
    // IntersectionObserver
    const observer = new IntersectionObserver(handleIntersection, {
      root: null,
      rootMargin: '0px',
      threshold: 0.5,
    })
    contentRefs.forEach((ref) => {
      if (ref.current) {
        observer.observe(ref.current)
      }
    })
    return () => {
      observer.disconnect()
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

            {info.menus.map(
              (menu) =>
                menu.menutype === menuType &&
                menu._id && (
                  <div
                    key={`menu_${menu._id}`}
                    onClick={() => {
                      openModalHandler(menu._id)
                    }}
                  >
                    <MenuCard key={menu._id} info={menu} />
                  </div>
                ),
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
  cursor: pointer;
`

const StyledLi = styled.li<{ $active: boolean }>`
  // active props 추가
  display: inline-block;
  padding: 16pt 40pt 0 0;
  font-weight: bold;
  color: ${(props) => (props.$active ? '#343434' : '#A9A9A9')};
`

const MenuCardsContainer = styled.div`
  align-items: center;
`

const StyledLiEach = styled.li`
  padding: 24pt 48pt;
  font-weight: bold;
  cursor: default;
`

const DisclaimerContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  background-color: #f2f2f2;
  font-family: 'Noto Sans KR', sans-serif;
  cursor: default;
  padding: 0 8pt;
`

const Disclaimer = styled.div`
  font-size: 1.5rem;
  color: #777;
  margin-top: 8pt;
`
