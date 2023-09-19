import { styled } from 'styled-components'
import Table from './Table'

const TableList = () => {
  const tables = [
    {
      name: '1번 테이블',

      orders: [],
      isOccupied: true,
      isDisabled: false,
    },
    {
      name: '2번 테이블',

      orders: [
        {
          restaurant_id: '1',
          restaurant_name: 'test',
          restaurant_address: 'test',
          updated_at: new Date().toString(),
          menus: {
            1: {
              menu_name: '아메리카노',
              price: 3000,
              quantity: 1,
              img: {
                filename: 'string',
                path: 'string',
                type: 'string',
              },
              options: [],
            },
            2: {
              menu_name: '카페라떼',
              price: 5000,
              quantity: 1,
              img: {
                filename: 'string',
                path: 'string',
                type: 'string',
              },
              options: [],
            },
          },
          status: 1,
          status_updated_at: {
            1: new Date().toString(),
          },
          _id: '1',
        },
      ],
      isOccupied: true,
      isDisabled: false,
    },
    {
      name: '3번 테이블',

      orders: [
        {
          restaurant_id: '1',
          restaurant_name: 'test',
          restaurant_address: 'test',
          updated_at: new Date().toString(),
          menus: {
            1: {
              menu_name: '아메리카노',
              price: 3000,
              quantity: 1,
              img: {
                filename: 'string',
                path: 'string',
                type: 'string',
              },
              options: [],
            },
            2: {
              menu_name: '카페라떼',
              price: 5000,
              quantity: 1,
              img: {
                filename: 'string',
                path: 'string',
                type: 'string',
              },
              options: [],
            },
          },
          status: 2,
          status_updated_at: {
            1: new Date().toString(),
          },
          _id: '1',
        },
      ],
      isOccupied: true,
      isDisabled: false,
    },
    {
      name: '1번 테이블',

      orders: [
        {
          restaurant_id: '1',
          restaurant_name: 'test',
          restaurant_address: 'test',
          updated_at: new Date().toString(),
          menus: {
            1: {
              menu_name: '아메리카노',
              price: 3000,
              quantity: 1,
              img: {
                filename: 'string',
                path: 'string',
                type: 'string',
              },
              options: [],
            },
            2: {
              menu_name: '카페라떼',
              price: 5000,
              quantity: 1,
              img: {
                filename: 'string',
                path: 'string',
                type: 'string',
              },
              options: [],
            },
          },
          status: 3,
          status_updated_at: {
            1: new Date().toString(),
          },
          _id: '1',
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
