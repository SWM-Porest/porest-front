import { useState } from 'react'
import { Link } from 'react-router-dom'
import { styled } from 'styled-components'

const ModalContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`
const ModalBackdrop = styled.div`
  z-index: 30;
  height: 100%;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items :end;
  background-color: rgba(0,0,0,0.4);
  border-radius: 10px;
  top:0;
  left:0;
  right:0;
  bottom;
`

const ModalBtn = styled.button`
  background-color: gray;
  text-decoration: none;
  border: none;
  padding: 20px;
  color: white;
  border-radius: 30px;
  cursor: grab;
`

const ExitBtn = styled(ModalBtn)`
  background-color: #4000c7;
  border-radius: 10px;
  text-decoration: none;
  margin: 10px;
  padding: 5px 10px;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
`

const ModalView = styled.div<{ $load: boolean }>`
  display: flex;
  align-items: center;
  flex-direction: column;
  border-radius: 20px;
  width: 100%;
  height: 80%;
  background-color: #ffffff;
  transition: all 0.6s cubic-bezier(0.22, 0.61, 0.36, 1);
  transform: ${(props) => (props.$load ? 'translateY(0)' : 'translateY(100%)')};
  > div.desc {
    margin: 50px;
    font-size: 20px;
    color: black;
  }
`

export const Modal = () => {
  const [isOpen, setIsOpen] = useState(false)
  console.log(isOpen ? 'true' : 'false')
  const openModalHandler = () => {
    setIsOpen(!isOpen)
  }

  return (
    <>
      <ModalContainer>
        <ModalBtn onClick={openModalHandler}> Open Modal</ModalBtn>
        <ModalBackdrop onClick={openModalHandler}>
          <ModalView $load={isOpen} onClick={(e) => e.stopPropagation()}>
            <ExitBtn onClick={openModalHandler}>x</ExitBtn>
            <div className="desc">Hello Modal Desc!</div>
          </ModalView>
        </ModalBackdrop>
      </ModalContainer>
    </>
  )
}
