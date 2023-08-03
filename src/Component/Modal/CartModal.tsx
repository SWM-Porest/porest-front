import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import CartPrice from 'Component/CartComponent/CartPrice'
import Header from 'Component/Header'
import { useCartModal } from 'Context/CartModalContext'
import React, { useEffect } from 'react'
import { styled } from 'styled-components'

const CartModal: React.FC = () => {
  const { isModalOpen, closeModal } = useCartModal()
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

  const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    // 배경 클릭 시 모달 닫기
    if (event.target === event.currentTarget) {
      closeModal()
    }
  }

  const handleContentClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    // 모달 내부(ModalContent) 클릭 시 모달 닫기 방지
    event.stopPropagation()
  }
  return (
    <ModalOverlay className={isModalOpen ? 'open' : ''} onClick={handleOverlayClick}>
      <ModalContent onClick={handleContentClick}>
        {/* 모달 내용 */}
        <Header
          HeaderName="주문서"
          Right={
            <CloseButtonContainer>
              <CloseButton icon={faXmark} onClick={closeModal} size="2xl" />
            </CloseButtonContainer>
          }
        ></Header>
        <CartPrice />
      </ModalContent>
    </ModalOverlay>
  )
}

export default CartModal

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`

const ModalContent = styled.div`
  background-color: #ffffff;
  position: relative;
  width: 100%;
  height: 100%;
  overflow: auto;
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
    background: #1d9255; /* hover 시 색상 변경 */
  }
`
export const CloseButton = styled(FontAwesomeIcon)`
  border: none;
  cursor: pointer;
  width: 54px;
  height: 54px;
  color: #c5c9cc; /* 아이콘 색상 */
  display: flex;
  justify-content: center;
  align-items: center;
`
