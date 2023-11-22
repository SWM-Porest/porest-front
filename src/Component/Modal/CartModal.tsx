import { ChevronLeft20Filled } from '@fluentui/react-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { getCookie, removeAllCookie } from 'Api/cartCookie'
import { getTableNumberCookie } from 'Api/tableCookie'
import { useAccessToken } from 'Api/tokenCookie'
import CartPrice from 'Component/CartComponent/CartPrice'
import Header from 'Component/Header'
import { useCartModal } from 'Context/CartModalContext'
import { useRestaurantState } from 'Context/restaurantContext'
import axios from 'axios'
import React, { useEffect } from 'react'
import { UseQueryResult, useQuery } from 'react-query'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { styled } from 'styled-components'
import { Table as TableModel } from 'Api/table'
interface OwnProps {
  isOpen: boolean
}
const CartModal: React.FC<OwnProps> = ({ isOpen }) => {
  const { data: restaurant } = useRestaurantState().restaurant
  const cookie = getCookie(restaurant?._id as string) || {}
  const { isModalOpen, closeModal } = useCartModal()
  const [accessToken] = useAccessToken()
  const pushToken = localStorage.getItem('pushToken')
  const { pathname } = useLocation()
  const [accesstoken] = useAccessToken()

  const { id } = useParams()
  const navigate = useNavigate()
  const getTableFromCookie = () => {
    const tableCookie = getTableNumberCookie()
    return tableCookie || ''
  }

  const table = getTableFromCookie()

  const fecthTableList = async () => {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/tables/restaurants/${id}`, {
      headers: {
        Authorization: `Bearer ${accesstoken}`,
      },
    })

    return response.data
  }

  const { data: tables, isLoading }: UseQueryResult<TableModel[]> = useQuery('tables', fecthTableList)

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
    const menus = cookie // 카트의 메뉴
    if (!accessToken) {
      // console.log('AccessToken이 없습니다. 로그인 페이지로 이동합니다.')
      showMessage('로그인을 진행해주세요.', 1500, '/img/close.png')
      localStorage.setItem('savedPath', pathname)
      navigate('/login')
      closeModal()
      return
    }

    if (Object.keys(menus).length === 0) {
      // console.log('주문할 메뉴가 없습니다.')
      showMessage('주문할 메뉴가 없습니다.\n주문할 메뉴를 담아주세요.', 1500, '/img/close.png')
      closeModal()
      return
    }
    if (tables && tables.length > 0 && !table) {
      // console.log('테이블 번호가 없습니다.')
      navigate(`/restaurants/${id}/table`)
      showMessage('테이블 번호를 입력해주세요.', 1500, '/img/close.png')
      return
    }
    try {
      createOrder(pushToken)
      closeModal()
      // Notification.requestPermission().then((permission) => {
      //   if (permission == 'denied') {
      //     createOrder(null)
      //   } else if (navigator.serviceWorker) {
      //     navigator.serviceWorker
      //       .register('../service-worker.js', { scope: '/' })
      //       .then((registration) => {
      //         const subscribeOptions = {
      //           userVisibleOnly: true,
      //           applicationServerKey: process.env.REACT_APP_PUBLIC_VAPID_KEY,
      //         }
      //         return registration.pushManager.subscribe(subscribeOptions)
      //       })
      //       .then(async (pushSubscription) => {
      //         createOrder(pushSubscription)
      //       })
      //       .catch((err) => {
      //         // console.log(err)
      //         createOrder(null)
      //       })
      //   }
      // })
    } catch (error) {
      console.error('주문 생성 중 오류 발생:', error)
      closeModal()
    }
  }
  const createOrder = async (pushSubscription: string | null) => {
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
        table_id: 1,
        menus: cookie,
        token: pushSubscription,
      }),
    })

    if (response.ok) {
      // console.log('주문 생성에 성공했습니다.')
      handleRemoveMenu()
      showMessage('주문이 완료되었습니다.\n접수 확인을 기다려주십시오.', 1500, '/img/check.png')
      response.json().then((data) => {
        navigate(`/orderlist?orderId=${data._id}`)
      })
    } else {
      console.error('주문 생성에 실패했습니다.')
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
              <ChevronLeft20Filled color="#212121" />
            </Icon>
          }
          HeaderName="주문서"
          Right={<Icon onClick={handleRemoveMenu}>전체삭제</Icon>}
        />
        <CartPrice />
        <ButtonContainer style={{ display: 'flex' }}>
          <StyledButton
            onClick={() => {
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
  overflow-y: auto;
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
  font-size: ${({ theme }) => theme.FONT_SIZE.medium};
  font-weight: 700;
  font-style: normal;
  text-align: center;
  text-decoration: none;
  background-color: ${({ theme }) => theme.COLOR.main};
  color: ${({ theme }) => theme.COLOR.common.white[0]};
  padding: 20px;
  width: 90%;
  height: 100%;
  margin: auto;
  margin-bottom: 40pt;
  border-radius: 10pt;
  /* box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.3); */
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
  cursor: pointer;
`

const ButtonContainer = styled.div`
  background-color: ${({ theme }) => theme.COLOR.common.white[0]};
`

const showMessage = (messageText: string, duration: number, img: string) => {
  const messageContainer = document.createElement('div')
  messageContainer.style.zIndex = '9999'
  messageContainer.style.display = 'flex'
  messageContainer.style.alignItems = 'center'
  messageContainer.style.width = '280px'
  messageContainer.style.whiteSpace = 'pre-wrap'

  const image = new Image()
  image.src = img
  image.style.width = '2rem'
  image.style.height = '2rem'
  image.style.marginRight = '1rem'

  const textContainer = document.createElement('div')
  textContainer.textContent = messageText
  textContainer.style.fontSize = '1.8rem'
  textContainer.style.fontWeight = '600'

  messageContainer.appendChild(image)
  messageContainer.appendChild(textContainer)

  const containerStyle = messageContainer.style
  containerStyle.position = 'fixed'
  containerStyle.top = '2rem'
  containerStyle.left = '50%'
  containerStyle.transform = 'translateX(-50%)'
  containerStyle.backgroundColor = '#fff'
  containerStyle.color = '#333'
  containerStyle.padding = '1rem 2.4rem'
  containerStyle.borderRadius = '1rem'
  containerStyle.opacity = '0'
  containerStyle.transition = 'opacity 0.3s'

  document.body.appendChild(messageContainer)

  setTimeout(() => {
    containerStyle.opacity = '1'
  }, 100)

  setTimeout(() => {
    containerStyle.opacity = '0'
    setTimeout(() => {
      document.body.removeChild(messageContainer)
    }, 300)
  }, duration)
  if (window.innerWidth >= 800) {
    containerStyle.left = `calc(50% + ${430 / 2}px)`
  }
}
