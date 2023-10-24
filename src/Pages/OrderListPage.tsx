import Header from 'Component/Header'
import OrderList from 'Component/ProfileComponent/OrderList'
import { ReactComponent as Chevron } from 'assets/Chevron.svg'
import { useNavigate } from 'react-router-dom'

const OrderListPage = () => {
  const navigate = useNavigate()

  const handleListClick = () => {
    navigate('/mypage')
  }
  return (
    <div>
      <Header
        Left={<Chevron width="2rem" height="2rem" fill="#212121" onClick={handleListClick} />}
        HeaderName={'주문내역'}
      />
      <OrderList />
    </div>
  )
}

export default OrderListPage
