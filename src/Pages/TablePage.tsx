import { ChevronLeft20Filled } from '@fluentui/react-icons'
import { getCookie } from 'Api/cartCookie'
import { getTableNumberCookie, setTableNumberCookie } from 'Api/tableCookie'
import Header from 'Component/Header'
import { Button, Input } from 'antd'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import styled from 'styled-components'
import { Table as TableModel } from 'Api/table'
import { UseQueryResult, useQuery } from 'react-query'
import axios from 'axios'
import { useAccessToken } from 'Api/tokenCookie'

const TablePage = () => {
  const { id } = useParams()
  const storedTableNumber = getTableNumberCookie() || '' // 쿠키에서 테이블 번호 가져오기
  const cookieData = getCookie(id as string) || {}

  const navigate = useNavigate()

  const [priceTotal, setPriceTotal] = useState(0)
  const [tableNumber, setTableNumber] = useState<string>(storedTableNumber)
  const [isInputValid, setInputValid] = useState(!!storedTableNumber)

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value
    setTableNumber(inputValue)

    const isNumber = /^\d+$/.test(inputValue)
    setInputValid(isNumber)
  }

  const handleInputComplete = () => {
    if (tableNumber && tables && tables.length >= Number(tableNumber)) {
      setTableNumberCookie(tableNumber)
      navigate(`/restaurants/${id}`)
    } else {
      alert('유효하지 않는 테이블 번호입니다. 다시 확인해주세요')
    }
  }

  useEffect(() => {
    let total = 0
    for (const key of Object.keys(cookieData)) {
      const menuItem = cookieData[key]

      if (menuItem && menuItem.menu_name) {
        const menuPrice = menuItem.price
        const menuOptions = menuItem.options || []
        let optionPrice = 0

        for (const option of menuOptions) {
          if (option && option.items && option.items.length > 0) {
            for (const item of option.items) {
              optionPrice += item.price
            }
          }
        }

        const orderTotalPrice = (menuPrice + optionPrice) * menuItem.quantity
        total += orderTotalPrice
      }
    }

    setPriceTotal(total)
  }, [])

  return (
    <div>
      <Header
        Left={
          <Icon onClick={() => navigate(`/restaurants/${id}`)}>
            <ChevronLeft20Filled color="#212121" />
          </Icon>
        }
        HeaderName={''}
        Right={''}
      ></Header>
      <MainContainer>
        <MainText>지금 위치하고 계시는 </MainText>
        <MainText>테이블 번호를 입력해주세요</MainText>

        {Object.keys(cookieData).length > 0 ? (
          <OrderContainer>
            {Object.keys(cookieData).map((key, index) => {
              const order = cookieData[key]
              if (order && order.menu_name) {
                if (index === 0) {
                  return (
                    <div key={key}>
                      <span>{order.menu_name}</span>
                      {Object.keys(cookieData).length > 1 && <span> 외 {Object.keys(cookieData).length - 1}개</span>}
                      <span> 총 {priceTotal.toLocaleString()}원의</span>
                    </div>
                  )
                }
              }
              return null
            })}

            <span>주문이 완료 됩니다.</span>
          </OrderContainer>
        ) : (
          // 주문 내역이 없을 때 표시할 내용
          <OrderContainer>
            <div>테이블 번호를 입력하고 </div>
            <div>주문을 시작할 수 있습니다.</div>
          </OrderContainer>
        )}
      </MainContainer>
      <InputContainer>
        <InputField
          placeholder="테이블 번호"
          value={tableNumber}
          type="number"
          onChange={handleInputChange}
          style={{ borderColor: isInputValid ? '#3FBA73' : '#FF3B30' }} // 버튼 색상 변경
        />
      </InputContainer>
      <ButtonContainer>
        <SubmitButton
          type="primary"
          onClick={handleInputComplete}
          disabled={!isInputValid}
          style={{
            backgroundColor: isInputValid ? '#3FBA73' : '#DDD',
            color: '#FFF',
          }}
        >
          입력완료
        </SubmitButton>
      </ButtonContainer>
    </div>
  )
}

export default TablePage

const Icon = styled.div``

const MainContainer = styled.div`
  color: ${({ theme }) => theme.COLOR.common.black[0]};
  line-height: 3.2rem;
  padding: 1rem 2rem;
`

const MainText = styled.h2`
  margin: 0;
  font-style: normal;
  font-weight: 700;
`
const OrderContainer = styled.div`
  color: ${({ theme }) => theme.COLOR.common.gray[40]};
  font-size: 1.4rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1.8rem;
  padding: 0.8rem 0;
`
const InputContainer = styled.div`
  align-items: center;
  padding: 0.2rem 2rem 0 2rem;
`

const InputField = styled(Input)`
  width: 100%;
  height: 6rem;
  flex-shrink: 0;
  color: ${({ theme }) => theme.COLOR.common.gray[50]};
  font-family: Pretendard;
  font-size: 1.6rem;
  font-style: normal;
  font-weight: 400;
  line-height: 2rem;
  margin-bottom: 1rem;
`
const SubmitButton = styled(Button)`
  height: 5.6rem;
  flex-shrink: 0;
  color: ${({ theme }) => theme.COLOR.common.white[0]};
  text-align: center;
  font-size: 1.6rem;
  font-style: normal;
  font-weight: 700;
  line-height: 2rem;
  width: 100%;
`

const ButtonContainer = styled.div`
  flex-shrink: 0;
  display: inline-flex;
  padding: 1rem 2rem;
  flex-direction: column;
  align-items: flex-start;
  position: absolute;
  bottom: 0;
  width: 100%;
  @media screen and (min-width: ${({ theme }) => theme.MEDIA.tablet}) {
    width: ${({ theme }) => theme.MEDIA.mobile};
  }
`
