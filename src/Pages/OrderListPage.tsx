import { ChevronLeft20Filled } from '@fluentui/react-icons'
import Header from 'Component/Header'
import OrderList from 'Component/ProfileComponent/OrderList'
import { useNavigate } from 'react-router-dom'

const OrderListPage = () => {
  const navigate = useNavigate()

  const handleListClick = () => {
    navigate('/mypage')
  }
  return (
    <div>
      <Header Left={<ChevronLeft20Filled color="#212121" onClick={handleListClick} />} HeaderName={'주문내역'} />
      <OrderList />
    </div>
  )
}

export default OrderListPage
