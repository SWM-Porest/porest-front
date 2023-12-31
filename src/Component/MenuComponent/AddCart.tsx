import { MenuOption } from 'Api/OrderInterface'
import { setCookie } from 'Api/cartCookie'
import { Menu, useRestaurantState } from 'Context/restaurantContext'
import { styled } from 'styled-components'

interface Ownprops {
  menu: Menu | null
  cnt: number
  openModalHandler: (menuId: string) => void
  selectedOptions: { [optionId: string]: { name: string; price: number }[] }
}

const AddCart: React.FC<Ownprops> = ({ menu, cnt, openModalHandler, selectedOptions }) => {
  const { data: restaurant } = useRestaurantState().restaurant

  const addToCart = () => {
    openModalHandler('')
    const formattedOptions: MenuOption[] = []

    for (const optionId in selectedOptions) {
      if (Object.prototype.hasOwnProperty.call(selectedOptions, optionId)) {
        formattedOptions.push(
          ...selectedOptions[optionId].map((item) => ({
            _id: optionId,
            name: menu?.menuOptions.find((option) => option._id === optionId)?.name || '',
            isSoldOut: menu?.menuOptions.find((option) => option._id === optionId)?.isSoldOut || false,
            maxSelect: menu?.menuOptions.find((option) => option._id === optionId)?.maxSelect || 1,
            isRequired: menu?.menuOptions.find((option) => option._id === optionId)?.isRequired || false,
            items: [
              {
                name: item.name,
                price: item.price,
              },
            ],
          })),
        )
      }
    }

    // 중복된 옵션 이름 병합 로직 추가
    const mergedOptions: MenuOption[] = []
    formattedOptions.forEach((option) => {
      const existingOption = mergedOptions.find((merged) => merged.name === option.name)
      if (existingOption) {
        existingOption.items.push(...option.items)
      } else {
        mergedOptions.push(option)
      }
    })

    setCookie(restaurant?._id as string, menu as Menu, cnt, mergedOptions)
    showMessage('장바구니에 추가되었습니다.', 1500)
  }

  return (
    <ButtonContainer style={{ display: 'flex' }}>
      <StyledButton onClick={addToCart}>장바구니 담기</StyledButton>
    </ButtonContainer>
  )
}

export default AddCart

const ButtonContainer = styled.div`
  display: inline-flex;
  padding: 1rem 2rem;
  flex-direction: column;
  align-items: flex-start;
`

export const StyledButton = styled.button`
  cursor: pointer;
  font-size: ${({ theme }) => theme.FONT_SIZE.medium};
  font-weight: 700;
  font-style: normal;
  text-align: center;
  line-height: 2rem;

  text-decoration: none;
  background-color: ${({ theme }) => theme.COLOR.main};
  color: ${({ theme }) => theme.COLOR.common.white[0]};
  width: 100%;
  height: 5.6rem;

  border-radius: 1.2rem;
  /* box-shadow: 0 0.8rem 1.6rem 0 rgba(0, 0, 0, 0.3); */
  border: none;
  transition: 0.4s;
  &:hover {
    box-shadow: 0px 0px 16pt 0 ${({ theme }) => theme.COLOR.main};
    transition: 0.4s;
  }
`

const showMessage = (messageText: string, duration: number) => {
  const messageContainer = document.createElement('div')
  messageContainer.style.display = 'flex'
  messageContainer.style.alignItems = 'center'
  messageContainer.style.width = '28rem'

  const image = new Image()
  image.src = '/img/check.png'
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
