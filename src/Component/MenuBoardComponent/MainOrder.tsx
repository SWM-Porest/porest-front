import Header from 'Component/Header'
import { MenuModal } from 'Component/MenuComponent/MenuModal'
import { Restaurant } from 'Context/restaurantContext'
import { ReactComponent as Chevron } from 'assets/Chevron.svg'
import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import MenuCard from './MenuCard'

interface OwnProps {
  info: Restaurant
}

const MainOrder: React.FC<OwnProps> = ({ info }) => {
  const [menuId, setMenuId] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [activeMenuIndex, setActiveMenuIndex] = useState(0)
  const [isHeaderVisible, setIsHeaderVisible] = useState(true)
  const navigate = useNavigate()

  const handleIconLeftClick = () => {
    navigate('/restaurants')
  }
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const hideHeaderThreshold = window.innerWidth
      setIsHeaderVisible(scrollY > hideHeaderThreshold)
    }
    handleScroll() // 최초 실행 시 스크롤 위치 측정
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const openModalHandler = (id: string) => {
    setMenuId(id)
    setIsOpen(!isOpen)
  }

  const filteredMenus = info.menus.filter((menu) => menu.category !== '간편주문')

  // 중복되지 않은 메뉴 타입 추출
  const uniqueMenuTypes = filteredMenus.reduce((types: string[], menu) => {
    if (!types.includes(menu.category)) {
      types.push(menu.category)
    }
    return types
  }, [])

  // Ref 배열을 동적 생성
  const contentRefs = uniqueMenuTypes.map(() => useRef<HTMLDivElement>(null))

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
      <StyledTop>
        {isHeaderVisible && (
          <Header
            Left={
              <Icon onClick={handleIconLeftClick}>
                <Chevron width="2rem" height="2rem" fill="#212121" />
              </Icon>
            }
            HeaderName={info ? info.name : ''}
            Right={''}
          />
        )}
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
      </StyledTop>
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
            <MenuCardContainer>
              <LiContainer>
                <StyledLiEach>{menuType}</StyledLiEach>
              </LiContainer>
              {filteredMenus.map(
                (menu) =>
                  menu.category === menuType &&
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
            </MenuCardContainer>
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

const StyledTop = styled.div`
  position: sticky;
  top: 0;
  background-color: ${({ theme }) => theme.COLOR.common.white[0]};
  cursor: pointer;
`
const Icon = styled.div`
  display: flex;
  padding: 1rem;
  gap: 1rem;
  border-radius: 2rem;
  background: ${({ theme }) => theme.COLOR.common.white[0]};
`

const StyledUl = styled.ul`
  margin: 0;
  display: inline-flex;
  padding: 1rem 2rem;
  align-items: flex-start;
  gap: 0.4rem;
`

const StyledLi = styled.li<{ $active: boolean }>`
  display: inline-block;
  padding: 0.8rem 1.2rem;
  justify-content: center;
  align-items: center;
  border-radius: 1.7rem;

  color: ${(props) => (props.$active ? props.theme.COLOR.common.white[0] : props.theme.COLOR.common.gray[40])};
  background-color: ${(props) => (props.$active ? props.theme.COLOR.common.gray[20] : 'transparent')};

  font-size: 1.4rem;
  font-style: normal;
  font-weight: 700;
`

const MenuCardsContainer = styled.div`
  align-items: center;
`
const MenuCardContainer = styled.div`
  margin: 2rem 0 0 0;
  background-color: ${({ theme }) => theme.COLOR.common.white[0]};
  padding: 0 2rem;
`
const LiContainer = styled.div`
  display: inline-flex;
  padding: 2rem 0 0.8rem 0;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.8rem;
`
const StyledLiEach = styled.li`
  color: ${({ theme }) => theme.COLOR.common.gray[20]};
  font-size: 2rem;
  font-style: normal;
  font-weight: 700;
  cursor: default;
`

const DisclaimerContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  background-color: ${({ theme }) => theme.COLOR.common.gray[100]};
  font-family: 'pretendard';
  cursor: default;
  padding: 0 8pt;
`

const Disclaimer = styled.div`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.COLOR.common.gray[40]};
  margin-top: 8pt;
`
