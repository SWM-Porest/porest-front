import { styled } from 'styled-components'
import Table from './Table'

const TableList = () => {
  const tables = [
    {
      name: '1번 테이블',

      orders: [
        {
          menuName: '아메리카노',
          menuPrice: 3000,
          menuCount: 1,
        },
        {
          menuName: '카페라떼',
          menuPrice: 4000,
          menuCount: 1,
        },
      ],
      isOccupied: true,
      isDisabled: false,
    },
    {
      name: '2번 테이블',

      orders: [
        {
          menuName: '아메리카노',
          menuPrice: 3000,
          menuCount: 1,
        },
        {
          menuName: '카페라떼',
          menuPrice: 4000,
          menuCount: 1,
        },
      ],
      isOccupied: true,
      isDisabled: false,
    },
    {
      name: '3번 테이블',

      orders: [
        {
          menuName: '아메리카노',
          menuPrice: 3000,
          menuCount: 1,
        },
        {
          menuName: '카페라떼',
          menuPrice: 4000,
          menuCount: 1,
        },
      ],
      isOccupied: true,
      isDisabled: false,
    },
    {
      name: '4번 테이블',

      orders: [
        {
          menuName: '아메리카노',
          menuPrice: 3000,
          menuCount: 1,
        },
        {
          menuName: '카페라떼',
          menuPrice: 4000,
          menuCount: 1,
        },
      ],
      isOccupied: true,
      isDisabled: false,
    },
    {
      name: '5번 테이블',

      orders: [
        {
          menuName: '아메리카노',
          menuPrice: 3000,
          menuCount: 1,
        },
        {
          menuName: '카페라떼',
          menuPrice: 4000,
          menuCount: 1,
        },
      ],
      isOccupied: true,
      isDisabled: false,
    },
    {
      name: '6번 테이블',

      orders: [
        {
          menuName: '아메리카노',
          menuPrice: 3000,
          menuCount: 2,
        },
        {
          menuName: '카페라떼',
          menuPrice: 4000,
          menuCount: 1,
        },
      ],
      isOccupied: true,
      isDisabled: false,
    },
  ]
  return (
    <Container>
      {tables.map((table, index) => {
        return <Table key={index} table={table} />
      })}
    </Container>
  )
}

export default TableList

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
`
