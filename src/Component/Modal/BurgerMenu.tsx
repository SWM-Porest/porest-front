import { MenuOutlined } from '@ant-design/icons'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { CloseButton, CloseButtonContainer } from 'Component/Modal/CartModal'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import Header from '../Header'
const BurgerMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <BurgerMenuContainer>
      <MenuIcon onClick={toggleMenu} />
      {isMenuOpen && (
        <MenuList onClick={toggleMenu}>
          <MenuView $load={isMenuOpen}>
            {' '}
            <Header
              HeaderName={''}
              Right={
                <>
                  <CloseButtonContainer>
                    <CloseButton icon={faXmark} size="2xl" />
                  </CloseButtonContainer>
                </>
              }
            />
            <LinkPage to={`/restaurants`}>레스토랑</LinkPage>
            <LinkPage to="/mypage">회원 정보</LinkPage>
          </MenuView>
        </MenuList>
      )}
    </BurgerMenuContainer>
  )
}

export default BurgerMenu

const BurgerMenuContainer = styled.div`
  position: relative;
`

const MenuIcon = styled(MenuOutlined)`
  font-size: 2.5rem;
  cursor: pointer;
  margin-right: 16pt;
`

const MenuList = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.COLOR.common.gray[600]};
  z-index: 2;
`

const MenuView = styled.div<{ $load: boolean }>`
  position: absolute;
  top: 0;
  left: ${({ $load }) => ($load ? '0' : '-100%')};
  width: 60%;
  height: 100%;
  background-color: ${({ theme }) => theme.COLOR.common.white};
  z-index: 3;
  padding: 24pt;
`

const LinkPage = styled(Link)`
  text-decoration: none;
  color: ${({ theme }) => theme.COLOR.common.black};
  font-size: 2.5rem;
  font-weight: bold;
  margin: 0 40pt 0 16pt;
  padding: 8pt;
  display: block;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${({ theme }) => theme.COLOR.common.gray[700]};
  }
`
