import { ChevronLeft20Regular } from '@fluentui/react-icons'
import Header from 'Component/Header'
import RestaurantOrderList from 'Component/RestaurantOrder/RestaurantOrderList'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
const RestaurantOrderPage = () => {
  const navigate = useNavigate()

  return (
    <>
      <Header
        Left={<ChevronLeft20Regular style={{ cursor: 'pointer' }} onClick={() => navigate(-1)} />}
        HeaderName="주문 알림"
      />
      <StyledOrderList>
        <RestaurantOrderList />
      </StyledOrderList>
    </>
  )
}

export default RestaurantOrderPage

const StyledOrderList = styled.div`
  padding: 0 1rem;
`
