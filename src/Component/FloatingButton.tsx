import { Restaurant } from 'Context/restaurantContext'
import { Modal } from 'antd'
import React, { useState } from 'react'
import styled from 'styled-components'

interface OwnProps {
  info: Restaurant
}

interface MenuType {
  name: string
}

const FloatingButton: React.FC<OwnProps> = ({ info }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [selectedMenu, setSelectedMenu] = useState<MenuType | null>(null)
  const [isOrderModalVisible, setIsOrderModalVisible] = useState(false)

  const toggleMenu = (menu: MenuType) => {
    setSelectedMenu(menu)
    setIsOrderModalVisible(true)
  }

  const handleOrder = () => {
    // 주문 처리 로직을 추가해야 함
    setIsOrderModalVisible(false)
  }

  const simplifiedMenus = info.menus.filter((menu) => menu.category === '간편주문')

  return (
    <FloatingButtonContainer>
      {isMenuOpen && (
        <Menu>
          {simplifiedMenus.map((menu, index) => (
            <StyledButton key={index} onClick={() => toggleMenu(menu)}>
              {menu.name}
            </StyledButton>
          ))}
          <StyledButton>다국어</StyledButton>
        </Menu>
      )}
      <FloatingButtonStyled onClick={() => setIsMenuOpen(!isMenuOpen)}>
        {isMenuOpen ? 'Porest' : 'Porest'}
      </FloatingButtonStyled>

      <LargeModal
        title={`주문 확인 - ${selectedMenu ? selectedMenu.name : ''}`}
        width={400}
        visible={isOrderModalVisible}
        onOk={handleOrder}
        onCancel={() => setIsOrderModalVisible(false)}
        okText="주문"
        cancelText="취소"
      >
        {selectedMenu && <p>{selectedMenu.name}을(를) 주문하시겠습니까?</p>}
      </LargeModal>
    </FloatingButtonContainer>
  )
}

export default FloatingButton

const FloatingButtonContainer = styled.div`
  position: fixed;
  bottom: 36pt;
  right: 36pt;
`

const FloatingButtonStyled = styled.button`
  background-color: ${({ theme }) => theme.COLOR.main};
  color: ${({ theme }) => theme.COLOR.common.white};
  border-radius: 50%;
  width: 96pt;
  height: 96pt;
  font-size: 1.8rem;
  cursor: pointer;
`

const Menu = styled.div`
  flex-direction: column;
  position: fixed;
  bottom: 144pt;
`

const StyledButton = styled.button`
  width: 96pt;
  height: 96pt;
  font-size: 1.8rem;
  margin: 8pt 0;
  cursor: pointer;
  background-color: ${({ theme }) => theme.COLOR.common.white};
  border: 1px solid ${({ theme }) => theme.COLOR.common.gray[700]};
  border-radius: 50%;
`
const LargeModal = styled(Modal)`
  .ant-modal-content {
    transform: scale(1.5);
  }
`
