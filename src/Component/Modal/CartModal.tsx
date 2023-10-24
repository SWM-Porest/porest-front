import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { CreateOrder, createOrder } from 'Api/createOrder'
import { getCookie, removeAllCookie } from 'Api/cartCookie'
import { useAccessToken } from 'Api/tokenCookie'
import { useNotification } from 'Api/useNotification'
import CartPrice from 'Component/CartComponent/CartPrice'
import Header from 'Component/Header'
import { useCartModal } from 'Context/CartModalContext'
import { useRestaurantState } from 'Context/restaurantContext'
import { ReactComponent as Chevron } from 'assets/Chevron.svg'
import React, { useEffect } from 'react'
import { useMutation } from 'react-query'
import { useSearchParams } from 'react-router-dom'
import { styled } from 'styled-components'

interface OwnProps {
  isOpen: boolean
}
const CartModal: React.FC<OwnProps> = ({ isOpen }) => {
  const { data: restaurant, loading, error } = useRestaurantState().restaurant
  const cookie = getCookie(restaurant?._id as string) || {}
  const { isModalOpen, closeModal } = useCartModal()
  const [accessToken, setAccessToken] = useAccessToken()

  if (isOpen) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = 'auto'
  }

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isModalOpen) {
        closeModal()
      }
    }

    document.body.style.overflow = isModalOpen ? 'hidden' : 'auto' // overflow 속성 변경
    document.addEventListener('keydown', handleEscape)

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'auto' // 컴포넌트가 unmount 될 때 다시 body의 overflow를 auto로 변경
    }
  }, [isModalOpen, closeModal])

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
          restaurant_id: restaurant?._id,
          restaurant_name: restaurant?.name,
          restaurant_address: restaurant?.address,
          //테이블 아이디 어디서 받아야할지 모르겠음
          table_id: 1,
          menus: cookie,
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
        console.log('주문 생성에 성공했습니다.')
      } else {
        console.error('주문 생성에 실패했습니다.')
      }
    } catch (error) {
      console.error('주문 생성 중 오류 발생:', error)
    }
  }
  const handleRemoveMenu = () => {
    removeAllCookie(restaurant?._id as string)
  }

  return (
    <ModalContainer>
      <ModalView $load={isOpen} onClick={(e) => e.stopPropagation()}>
        {/* 모달 내용 */}
        <Header
          Left={
            <Icon onClick={closeModal}>
              <Chevron width="2rem" height="2rem" fill="#212121" />
            </Icon>
          }
          HeaderName="주문서"
          Right={<Icon onClick={handleRemoveMenu}>전체삭제</Icon>}
        />
        <CartPrice />
        <ButtonContainer style={{ display: 'flex' }}>
          <StyledButton
            onClick={() => {
              // useNotification()
              handleOrder()
            }}
          >
            주문하기
          </StyledButton>
        </ButtonContainer>
      </ModalView>
    </ModalContainer>
  )
}

export default CartModal
const ModalContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  @media screen and (min-width: ${({ theme }) => theme.MEDIA.tablet}) {
    width: ${({ theme }) => theme.MEDIA.mobile};
  }
`

const ModalView = styled.div<{ $load: boolean }>`
  z-index: 31;
  position: fixed;
  bottom: ${(props) => (props.$load ? '0' : '-100%')};
  width: 100vw;
  height: 100%;
  background-color: ${({ theme }) => theme.COLOR.common.white[0]};
  transition: all 0.6s cubic-bezier(0.22, 0.61, 0.36, 1);
  @media screen and (min-width: ${({ theme }) => theme.MEDIA.tablet}) {
    width: ${({ theme }) => theme.MEDIA.mobile};
  }
`

export const CloseButtonContainer = styled.div`
  right: 20pt;
  width: 72px; /* 원하는 크기 조정 */
  height: 72px; /* 원하는 크기 조정 */
  border-radius: 50%; /* 원형 모양으로 만들기 */
  display: flex;
  justify-content: center;
  align-items: center;
  transition: background 0.3s ease-in-out; /* hover 시 배경색 변경 애니메이션 */
  &:hover {
    background: ${({ theme }) => theme.COLOR.main}; /* hover 시 색상 변경 */
  }
`
export const CloseButton = styled(FontAwesomeIcon)`
  border: none;
  cursor: pointer;
  width: 54px;
  height: 54px;
  color: ${({ theme }) => theme.COLOR.common.gray[70]};
  display: flex;
  justify-content: center;
  align-items: center;
`
const StyledButton = styled.button`
  cursor: pointer;
  font-size: ${({ theme }) => theme.FONT_SIZE.small};
  font-weight: bold;
  text-decoration: none;
  text-align: center;
  background-color: ${({ theme }) => theme.COLOR.main};
  color: ${({ theme }) => theme.COLOR.common.white[0]};
  padding: 20px;
  width: 90%;
  height: 100%;
  margin: auto;
  margin-bottom: 40pt;
  border-radius: 10pt;
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.3);
  border: none;
  transition: 0.4s;
  &:hover {
    box-shadow: 0px 0px 16px 0 ${({ theme }) => theme.COLOR.main};
    transition: 0.4s;
  }
`
const Icon = styled.div`
  display: flex;
  padding: 1rem;
  gap: 1rem;
  border-radius: 2rem;
  background: ${({ theme }) => theme.COLOR.common.white[0]};
`

const ButtonContainer = styled.div`
  background-color: ${({ theme }) => theme.COLOR.common.white[0]};
`
