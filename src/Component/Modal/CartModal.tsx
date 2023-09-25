import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useNotification } from 'Api/useNotification'
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
        <div style={{ display: 'flex' }}>
          <StyledButton onClick={useNotification}>주문하기</StyledButton>
        </div>
      </ModalContent>
    </ModalOverlay>
  )
}

export default CartModal

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.COLOR.common.gray[600]};
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`

const ModalContent = styled.div`
  background-color: ${({ theme }) => theme.COLOR.common.white};
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
    background: ${({ theme }) => theme.COLOR.main}; /* hover 시 색상 변경 */
  }
`
export const CloseButton = styled(FontAwesomeIcon)`
  border: none;
  cursor: pointer;
  width: 54px;
  height: 54px;
  color: ${({ theme }) => theme.COLOR.common.gray[700]}; /* 아이콘 색상 */
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
  color: ${({ theme }) => theme.COLOR.common.white};
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
