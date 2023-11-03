import { Table as TableModel } from 'Api/table'
import Loading from 'Component/Loading'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useQueries } from 'react-query'
import styled from 'styled-components'

interface Props {
  table: TableModel
}

const Table: React.FC<Props> = ({ table }) => {
  const deepCopyTable = { ...table }
  const [viewedTable, setViewedTable] = useState<TableModel>(deepCopyTable)
  const [isModalOpen, setIsOpenModal] = useState(false)
  const [numberOfOnCooking, setNumberOfOnCooking] = useState(0)
  const [numberOfOnServed, setNumberOfOnServed] = useState(0)
  const [numberOfRequested, setNumberOfRequested] = useState(0)
  const [orderStatus, setOrderStatus] = useState(0)

  const toggleModal = () => {
    setIsOpenModal(!isModalOpen)
  }

  const fetchOrders = async (order_id: string) => {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/orders/${order_id}`)

    if (response.status === 200) {
      const order = response.data

      if (order.status <= 2) {
        setNumberOfOnCooking(numberOfOnCooking + 1)
      } else if (order.status > 2) {
        setNumberOfOnServed(numberOfOnServed + 1)
      }

      if (orderStatus < order.status) {
        setOrderStatus(order.status)
      }

      setViewedTable((prev) => ({
        ...prev,
        orders: prev.orders ? [...prev.orders, order] : [order],
      }))
    }

    return response.data
  }

  const result = useQueries(
    table.order_ids.map((order_id: string) => {
      return { queryKey: ['orders', order_id], queryFn: () => fetchOrders(order_id), staleTime: Infinity }
    }),
  )

  const getStatusColor = (status: number) => {
    if (status === 0) {
      return 'transparent'
    } else if (status === 1) {
      return '#3FBA73'
    } else if (status === 2) {
      return '#2B81FF'
    } else {
      return '#999999'
    }
  }

  const getStatusText = (status: number) => {
    if (status === 0) {
      return '빈자리'
    } else if (status === 1) {
      return '주문 접수'
    } else if (status === 2) {
      return '조리중'
    } else {
      return '조리완료'
    }
  }

  const getOrderElement = () => {
    const menus = viewedTable.orders
      .map((order) => {
        if (viewedTable.orders) return Object.values(order.menus)
      })
      .flat()
    // console.log(menus)
    if (menus === undefined || menus.length === 0) {
      return ''
    }

    return menus.length > 1 ? (
      <div>
        {menus[0] && menus[0].menu_name} 외 {menus.length - 1}개
      </div>
    ) : (
      <div>{menus[0] && menus[0].menu_name}</div>
    )
  }

  return (
    <StyledTable onClick={toggleModal}>
      <TableHeader color={getStatusColor(orderStatus)}>
        <TableHeaderLeft>
          <TableName>{viewedTable.name}</TableName>
          <TableTime>10분</TableTime>
        </TableHeaderLeft>
        <TableStatus>{getStatusText(orderStatus)}</TableStatus>
      </TableHeader>
      {viewedTable.orders && Object.values(viewedTable.orders).length > 0 ? (
        <TableBody>
          <TableMenus>{getOrderElement()}</TableMenus>
          <TableMenusStat>
            {`조리중 ${numberOfOnCooking}건 • 조리 완료 ${numberOfOnServed}건 • 요청 사항 ${numberOfRequested}건`}
          </TableMenusStat>
        </TableBody>
      ) : (
        ''
      )}
      {/* <Modal
        title={table.name + ' 주문지'}
        open={isModalOpen}
        onCancel={toggleModal}
        okText={'확인'}
        cancelText={'취소'}
      >
        <Receipt>
          <ReceiptInfo>
            <ReceiptTotalCount>
              총 <span style={{ color: 'green' }}>{table.order.length}</span> 개 주문
            </ReceiptTotalCount>
            <ReceiptTotalPrice>
              총{' '}
              {table.orders
                .map((order) => {
                  return order.menuPrice
                })
                .reduce((acc, cur) => acc + cur)
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              원
            </ReceiptTotalPrice>
          </ReceiptInfo>
          {table.orders.map((order, index) => {
            return (
              <ReceiptContent key={index}>
                <ReceiptContentTitle>
                  {order.menuName} x {order.menuCount}
                </ReceiptContentTitle>
                <ReceiptContentPrice>{order.menuPrice * order.menuCount} 원</ReceiptContentPrice>
              </ReceiptContent>
            )
          })}
        </Receipt>
      </Modal> */}
    </StyledTable>
  )
}

export default Table
const TableBody = styled.div`
  padding: 8pt;
`
const TableTime = styled.div`
  color: #ffffff;
  opacity: 0.7;
`

const TableHeaderLeft = styled.div`
  display: flex;
`

const TableName = styled.div`
  margin-right: 8pt;
  font-weight: bold;
`

const TableStatus = styled.div``

const TableHeader = styled.div`
  padding: 16pt;
  background-color: ${(props) => props.color};
  border-radius: 10pt 10pt 0pt 0pt;
  display: flex;
  justify-content: space-between;
  ${TableName} {
    color: ${(props) => (props.color === 'transparent' ? '#666666' : '#FFFFFF')};
  }
  ${TableStatus} {
    color: ${(props) => (props.color === 'transparent' ? '#999999' : '#FFFFFF')};
  }
`

const StyledTable = styled.div`
  background-color: #fafafa;
  width: 20em;
  height: fit-content;
  margin: 10pt;
  border-radius: 10pt;
  @media screen and (max-width: 768px) {
    font-size: 2.25rem;
  }
`

const TableMenus = styled.div`
  padding-bottom: 8pt;
`
const TableMenusStat = styled.div`
  font-size: ${({ theme }) => theme.FONT_SIZE.tiny};
  color: #666666;
`
