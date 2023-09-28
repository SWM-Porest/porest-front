import { FlexCenterCSS } from 'Styles/common'
import { Modal } from 'antd'
import { useState } from 'react'
import styled from 'styled-components'

interface Table {
  name: string
  orders: any[]
  isOccupied: boolean
  isDisabled: boolean
}
interface Props {
  table: Table
}

const Table: React.FC<Props> = ({ table }) => {
  const [isModalOpen, setIsOpenModal] = useState(false)

  const toggleModal = () => {
    setIsOpenModal(!isModalOpen)
  }

  return (
    <StyledTable onClick={toggleModal}>
      <TableName>{table.name}</TableName>
      <TableMenus>
        {table.orders
          .map((order) => {
            return order.menuName ?? 'test'
          })
          .join(', ')}
      </TableMenus>
      <Modal
        title={table.name + ' 주문지'}
        open={isModalOpen}
        onCancel={toggleModal}
        okText={'확인'}
        cancelText={'취소'}
      >
        <Receipt>
          <ReceiptInfo>
            <ReceiptTotalCount>
              총 <span style={{ color: 'green' }}>{table.orders.length}</span> 개 주문
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
          {table.orders.map((order) => {
            return (
              <ReceiptContent>
                <ReceiptContentTitle>
                  {order.menuName} x {order.menuCount}
                </ReceiptContentTitle>
                <ReceiptContentPrice>{order.menuPrice * order.menuCount} 원</ReceiptContentPrice>
              </ReceiptContent>
            )
          })}
        </Receipt>
      </Modal>
    </StyledTable>
  )
}

export default Table

const Receipt = styled.div`
  display: flex;
  flex-direction: column;
`
const ReceiptContent = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`
const ReceiptContentTitle = styled.div``
const ReceiptContentPrice = styled.div``
const ReceiptInfo = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

const ReceiptTotalPrice = styled.div`
  font-size: ${({ theme }) => theme.FONT_SIZE.SMALL};
`
const ReceiptTotalCount = styled.div`
  font-size: ${({ theme }) => theme.FONT_SIZE.SMALL};
`

const TableName = styled.div`
  padding: 8pt;
  font-size: ${({ theme }) => theme.FONT_SIZE.SMALL};
  color: ${({ theme }) => theme.COLOR.common.grey};
  font-weight: bold;
`
const StyledTable = styled.div`
  width: 128pt;
  height: 64pt;
  margin: 10pt;
  border-radius: 10pt;
  background-color: ${({ theme }) => theme.COLOR.common.white};
`
const TableMenus = styled.div`
  padding: 8pt;
  font-size: ${({ theme }) => theme.FONT_SIZE.SMALL};
  color: ${({ theme }) => theme.COLOR.common.grey};
`
