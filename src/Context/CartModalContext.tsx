import React, { createContext, useState, useContext } from 'react'

// Modal 상태를 위한 인터페이스 정의
interface CartModalContextProps {
  isModalOpen: boolean
  openModal: () => void
  closeModal: () => void
}

// Modal Context 생성
const CartModalContext = createContext<CartModalContextProps | undefined>(undefined)

// Modal Provider 컴포넌트 정의
export const CartModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [isModalOpen, setModalOpen] = useState(false)

  const openModal = () => {
    setModalOpen(true)
  }

  const closeModal = () => {
    setModalOpen(false)
  }

  return (
    <CartModalContext.Provider value={{ isModalOpen, openModal, closeModal }}>{children}</CartModalContext.Provider>
  )
}

// 모달 상태 및 함수를 사용하기 위한 커스텀 훅
export const useCartModal = () => {
  const context = useContext(CartModalContext)
  if (!context) {
    throw new Error('useCartModal must be used within a CartModalProvider')
  }
  return context
}
