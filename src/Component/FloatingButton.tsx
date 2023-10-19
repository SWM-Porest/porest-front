import { getTotalCartItems } from 'Api/cartCookie'
import { useAccessToken } from 'Api/tokenCookie'
import { useCartModal } from 'Context/CartModalContext'
import { Restaurant, useRestaurantState } from 'Context/restaurantContext'
import { Badge, Modal } from 'antd'
import { ReactComponent as SimpleOrder } from 'assets/Call.svg'
import { ReactComponent as Cart } from 'assets/Cart.svg'
import { ReactComponent as ChatBot } from 'assets/Group 19.svg'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

import CartModal from 'Component/Modal/CartModal'

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
  const [accessToken, setAccessToken] = useAccessToken()
  const { data: restaurant, loading, error } = useRestaurantState().restaurant

  const toggleMenu = (menu: MenuType) => {
    setSelectedMenu(menu)
    setIsOrderModalVisible(true)
  }
  const handleOrder = async () => {
    try {
      // API 요청을 보내는 부분
      const response = await fetch(`${process.env.REACT_APP_API_URL}/orders`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          restaurant_id: info._id,
          restaurant_name: info.name,
          restaurant_address: info.address,
          //테이블 아이디 어디서 받아야할지 모르겠음
          table_id: 1,
          menus: {
            '': {
              menu_name: selectedMenu?.name,
              quantity: 1,
              price: 0,
              options: [
                {
                  isSoldOut: false,
                  maxSelect: 1,
                  items: [],
                  name: '',
                },
              ],
              img: '',
            },
          },
          token: {
            endpoint: 'url',
            //keys 뭐 들어가야하는지 모르겠음
            keys: {
              auth: 'string',
              p256dh: 'string',
            },
            expirationTime: null,
          },
        }),
      })

      if (response.ok) {
        setIsOrderModalVisible(false)
      } else {
        console.error('주문 생성에 실패했습니다.')
      }
    } catch (error) {
      console.error('주문 생성 중 오류 발생:', error)
    }
  }
  const [totalCartItems, setTotalCartItems] = useState(0)
  useEffect(() => {
    const updateTotalCartItems = () => {
      const totalItems = getTotalCartItems(restaurant?._id as string)
      setTotalCartItems(totalItems)
    }
    updateTotalCartItems()
    const intervalId = setInterval(updateTotalCartItems, 1000)
    return () => clearInterval(intervalId)
  }, [restaurant])
  const { openModal, isModalOpen } = useCartModal()
  const simplifiedMenus = info.menus.filter((menu) => menu.category === '간편주문')

  return (
    <div>
      <CartModal isOpen={isModalOpen} />
      <FloatingButtonContainer>
        {isMenuOpen && (
          <div>
            {simplifiedMenus.map((menu, index) => (
              <StyledSimpleOrder key={index} onClick={() => toggleMenu(menu)}>
                <StyledMenuName>{menu.name}</StyledMenuName>
              </StyledSimpleOrder>
            ))}
          </div>
        )}
        <SimpleOrderIcon onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <SimpleOrder width="2.4rem" height="2.4rem" />
        </SimpleOrderIcon>
        <ChatBotIcon>
          <ChatBot width="2.4rem" height="2.4rem" />
        </ChatBotIcon>

        <CartIconContainer onClick={openModal}>
          <StyledBadge count={totalCartItems}></StyledBadge>
          <CartIcon>
            <Cart width="2.4rem" height="2.4rem" fill="#fff" />
          </CartIcon>
        </CartIconContainer>
        <Modal
          title={`주문 확인 - ${selectedMenu ? selectedMenu.name : ''}`}
          width={400}
          open={isOrderModalVisible}
          onOk={handleOrder}
          onCancel={() => setIsOrderModalVisible(false)}
          okText="주문"
          cancelText="취소"
        >
          {selectedMenu && <p>{selectedMenu.name}을(를) 주문하시겠습니까?</p>}
        </Modal>
      </FloatingButtonContainer>
    </div>
  )
}

export default FloatingButton

const FloatingButtonContainer = styled.div`
  position: fixed;
  bottom: 3.6rem;
  right: 3.6rem;
  display: inline-flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.6rem;
  @media screen and (min-width: ${({ theme }) => theme.MEDIA.tablet}) {
    right: calc(50% - 39.4rem);
  }
`
const Icon = styled.div`
  cursor: pointer;
  display: flex;
  padding: 1.6rem;
  flex-direction: column;
  align-items: flex-start;
  border-radius: 2.8rem;

  box-shadow: 0 0.2rem 1.2rem 0 rgba(0, 0, 0, 0.16);
`

const StyledSimpleOrder = styled(Icon)`
  background: ${({ theme }) => theme.COLOR.common.white[0]};
`

const SimpleOrderIcon = styled(Icon)`
  background: ${({ theme }) => theme.COLOR.main};
`

const ChatBotIcon = styled(Icon)`
  background: ${({ theme }) => theme.COLOR.focus};
`
const CartIconContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: relative;
`

const CartIcon = styled(Icon)`
  background: ${({ theme }) => theme.COLOR.main};
`

const StyledMenuName = styled.div`
  width: 2.4rem;
  height: 2.4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  text-align: center;
`
const StyledBadge = styled(Badge)`
  position: absolute;
  top: 0;
  right: 0;
  .ant-badge-count {
    height: 2rem;
    width: 2rem;
    line-height: 2rem;
    font-size: 1.5rem;
    border-radius: 50%;
  }
`
