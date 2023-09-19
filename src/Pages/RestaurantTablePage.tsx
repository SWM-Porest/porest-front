import Footer from 'Component/Footer'
import Header from 'Component/Header'
import TableList from 'Component/TableComponent/TableList'

import { styled } from 'styled-components'

const RestaurantTablePage = () => {
  return (
    <div>
      <Header HeaderName="테이블 관리" />
      <TableList />
      <FooterContainer>
        <Footer />
      </FooterContainer>
    </div>
  )
}

export default RestaurantTablePage

const FooterContainer = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
`
