import Footer from 'Component/Footer'
import Header from 'Component/Header'
import TableList from 'Component/TableComponent/TableList'
import { useParams } from 'react-router-dom'

import { styled } from 'styled-components'

const RestaurantTablePage = () => {
  const { id } = useParams()

  if (id === undefined) throw new Error('id가 없습니다.')

  return (
    <div>
      <Header HeaderName="테이블 관리" />
      <TableList id={id} />
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
