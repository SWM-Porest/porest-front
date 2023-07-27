import { setCookie } from 'Api/cartCookie'
import { Menu, Restaurant, useRestaurantState } from 'Context/restaurantContext'
import { styled } from 'styled-components'

const StyeldButton = styled.button`
  cursor: pointer;
  font-size: 40px;
  font-weight: bold;
  text-decoration: none;
  text-align: center;
  background-color: #4caf50e0;
  color: #ffffff;
  padding: 30px;
  width: 90%;
  margin: auto;
  margin-bottom: 40px;
  border-radius: 10px;
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.3);
  border: none;
`
interface Ownprops {
  menu: Menu | null
  cnt: number
}

const AddCart: React.FC<Ownprops> = ({ menu, cnt }) => {
  const { data: restaurant } = useRestaurantState().restaurant

  return (
    <div style={{ display: 'flex' }}>
      <StyeldButton
        onClick={() => {
          setCookie(restaurant?._id as string, menu as Menu, cnt)
        }}
      >
        장바구니 담기
      </StyeldButton>
    </div>
  )
}

export default AddCart
