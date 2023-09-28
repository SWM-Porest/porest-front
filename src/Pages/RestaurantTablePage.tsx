import Footer from 'Component/Footer'
import Header from 'Component/Header'
import TableList from 'Component/TableComponent/TableList'
import { Layout } from 'antd'

const RestaurantTablePage = () => {
  return (
    <Layout>
      <Header HeaderName="테이블 관리" />
      <TableList />
      <Footer />
    </Layout>
  )
}

export default RestaurantTablePage
