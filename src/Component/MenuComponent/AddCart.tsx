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
            name: menu?.options.find((option) => option._id === optionId)?.name || '',
            isSoldOut: menu?.options.find((option) => option._id === optionId)?.isSoldOut || false,
            maxSelect: menu?.options.find((option) => option._id === optionId)?.maxSelect || 1,
            isRequired: menu?.options.find((option) => option._id === optionId)?.isRequired || false,
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
    <div style={{ display: 'flex' }}>
      <StyledButton onClick={addToCart}>장바구니 담기</StyledButton>
    </div>
  )
}

export default AddCart

const StyledButton = styled.button`
  cursor: pointer;
  font-size: ${({ theme }) => theme.FONT_SIZE.small};
  font-weight: bold;
  text-decoration: none;
  text-align: center;
  background-color: ${({ theme }) => theme.COLOR.main};
  color: ${({ theme }) => theme.COLOR.common.white};
  padding: 32pt;
  width: 90%;
  margin: auto;
  margin-bottom: 40pt;
  border-radius: 8pt;
  box-shadow: 0 8pt 16pt 0 rgba(0, 0, 0, 0.3);
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
  messageContainer.style.width = '416pt'

  const image = new Image()
  image.src = '/img/check.png'
  image.style.width = '40pt'
  image.style.height = '40pt'
  image.style.marginRight = '24pt'

  const textContainer = document.createElement('div')
  textContainer.textContent = messageText
  textContainer.style.fontSize = '2rem'
  textContainer.style.fontFamily = 'Noto Sans KR'
  textContainer.style.fontWeight = 'bold'

  messageContainer.appendChild(image)
  messageContainer.appendChild(textContainer)

  const containerStyle = messageContainer.style
  containerStyle.position = 'fixed'
  containerStyle.top = '24pt'
  containerStyle.left = '50%'
  containerStyle.transform = 'translateX(-50%)'
  containerStyle.backgroundColor = '#fff'
  containerStyle.color = '#333'
  containerStyle.padding = '24pt 40pt'
  containerStyle.borderRadius = '16pt'
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
}
