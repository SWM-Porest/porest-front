import { setCookie } from 'Api/cartCookie'
import { Menu, useRestaurantState } from 'Context/restaurantContext'
import { styled } from 'styled-components'

interface Ownprops {
  menu: Menu | null
  cnt: number
  openModalHandler: (menuId: string) => void
}

const AddCart: React.FC<Ownprops> = ({ menu, cnt, openModalHandler }) => {
  const { data: restaurant } = useRestaurantState().restaurant

  return (
    <div style={{ display: 'flex' }}>
      <StyeldButton
        onClick={() => {
          openModalHandler('')
          setCookie(restaurant?._id as string, menu as Menu, cnt)
        }}
      >
        장바구니 담기
      </StyeldButton>
    </div>
  )
}

export default AddCart

const StyeldButton = styled.button`
  cursor: pointer;
  font-size: ${({ theme }) => theme.FONT_SIZE.small};
  font-weight: bold;
  text-decoration: none;
  text-align: center;
  background-color: ${({ theme }) => theme.COLOR.main};
  color: ${({ theme }) => theme.COLOR.common.white};
  padding: 30px;
  width: 90%;
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
