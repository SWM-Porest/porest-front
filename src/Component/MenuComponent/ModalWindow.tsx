const ModalWindow = ({ children }) => {
  return (
    <ModalBackdrop $load={isOpen} onClick={openModalHandler}>
      <ModalView $load={isOpen} onClick={(e) => e.stopPropagation()}>
        {children}
      </ModalView>
    </ModalBackdrop>
  )
}

export default ModalWindow
const ModalBackdrop = styled.div<{ $load: boolean }>`
  z-index: 30;
  height: 100%;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: end;
  background-color: rgba(0, 0, 0, 0.4);
  transform: ${(props) => (props.$load ? 'translateY(0)' : 'translateY(105%)')};
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`

const ModalView = styled.div<{ $load: boolean }>`
  border-radius: 40px 40px 0px 0px;
  width: 100%;
  height: 80%;
  background-color: #ffffff;
  transition: all 0.6s cubic-bezier(0.22, 0.61, 0.36, 1);
  transform: ${(props) => (props.$load ? 'translateY(0)' : 'translateY(105%)')};
`
