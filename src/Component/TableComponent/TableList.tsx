import { styled } from 'styled-components'

import axios from 'axios'
import { UseQueryResult, useQuery } from 'react-query'
import { Table as TableModel } from 'Api/table'
import Loading from 'Component/Loading'
import Table from './Table'
import { useAccessToken } from 'Api/tokenCookie'

interface Props {
  id: string
}

const TableList: React.FC<Props> = ({ id }) => {
  const [accesstoken] = useAccessToken()
  const fecthTableList = async () => {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/tables/restaurants/${id}`, {
      headers: {
        Authorization: `Bearer ${accesstoken}`,
      },
    })

    return response.data
  }

  const { data: tables, isLoading }: UseQueryResult<TableModel[]> = useQuery('tables', fecthTableList)

  if (isLoading) {
    return <Loading />
  }

  return (
    <Container>
      {tables &&
        tables.map((table: TableModel, index: number) => {
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
