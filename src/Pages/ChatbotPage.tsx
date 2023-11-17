import Loading from 'Component/Loading'
import { getRestaurant, useRestaurantDispatch, useRestaurantState } from 'Context/restaurantContext'
import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import ChatBot from 'react-simple-chatbot'
import styled, { StyleSheetManager, ThemeProvider, createGlobalStyle } from 'styled-components'
import ErrorPage from './ErrorPage'

interface RedirectProps {
  path: string
}

const RedirectComponent: React.FC<RedirectProps> = ({ path }) => {
  const navigate = useNavigate()

  useEffect(() => {
    navigate(path)
  }, [path, navigate])

  return null
}

const ChatbotPage: React.FC = () => {
  const { id } = useParams()
  if (id === undefined) throw new Error('id가 없습니다.')

  const dispatch = useRestaurantDispatch()
  const { data: restaurant, loading, error } = useRestaurantState().restaurant
  const [isLoaded, setIsLoaded] = useState(false) // 데이터 로딩 상태 추가
  const chatBotRef = useRef<any>(null)

  interface Step {
    trigger: string
  }

  useEffect(() => {
    getRestaurant(dispatch, id).then(() => {
      setIsLoaded(true) // 데이터 로딩이 완료됐을 때 상태 업데이트
    })
  }, [dispatch, id])

  if (!isLoaded) {
    return <Loading />
  }
  if (error) return <ErrorPage errorCode={500} />
  const getMenuNames = (data: any) => {
    if (data && data.menus) {
      return data.menus.map((menu: any) => menu.name).join(', ')
    }
    return '메뉴 정보가 없습니다.'
  }
  if (!restaurant) return <ErrorPage errorCode={404} />

  const menuNames = getMenuNames(restaurant)

  const menuOptions1 = restaurant?.menus.map((menu, index) => ({
    value: `Menu${index + 1}`,
    label: menu.name,
    trigger: `Menu${index + 1}01`,
  }))

  const theme = {
    background: '#fff',
    fontFamily: 'Noto Sans KR',
    headerBgColor: '#3FBA73',
    headerFontColor: '#fff',
    headerFontSize: '15px',
    botBubbleColor: '#3FBA73',
    botFontColor: '#fff',
    userBubbleColor: '#fff',
    userFontColor: '#4a4a4a',
  }
  const steps = [
    { id: '0', message: `000님, 안녕하세요. Porest 챗봇입니다.`, trigger: '1' },
    { id: '1', message: '어떤 도움이 필요하신가요?', trigger: '2' },
    {
      id: '2',
      options: [
        { value: 'Order', label: '주문하기', trigger: '3' },
        { value: 'Reservation', label: '예약하기', trigger: '4' },
        { value: 'Recommend', label: '추천 받기', trigger: '5' },
        { value: 'Etc', label: '기타 서비스', trigger: '6' },
      ],
    },
    {
      id: '3',
      message: '주문하기를 선택하셨습니다. 메뉴판 페이지로 이동합니다.',
      trigger: '301',
    },
    {
      id: '301',
      component: <RedirectComponent path={`/restaurants/${id}`} />,
      end: true,
    },

    {
      id: '4',
      message: '예약하기를 선택하셨습니다. 예약하기 페이지로 이동합니다.',
      trigger: '401',
    },
    {
      id: '401',
      component: <RedirectComponent path={`/restaurants/${id}/waitings`} />,
      end: true,
    },
    {
      id: '5',
      message: '추천 받기를 선택하셨습니다.',
      trigger: '501',
    },
    {
      id: '501',
      message: '아직 추천 메뉴를 확인하실 수 없습니다.',
      end: true,
    },
    {
      id: '6',
      message: '기타 서비스를 선택하셨습니다.',
      trigger: '601',
    },
    {
      id: '601',
      message: '기타 서비스와 관련된 카테고리중 문의하고자 하는 내용을 선택해주세요~',
      trigger: '602',
    },
    {
      id: '602',
      options: [
        {
          value: 'RestaurantInfo',
          label: '레스토랑 정보',
          trigger: '603',
        },
        {
          value: 'MenuInfo',
          label: '메뉴 정보',
          trigger: '604',
        },
        {
          value: 'Etc',
          label: '기타',
          trigger: '605',
        },
      ],
    },
    {
      id: '603',
      message: '알고 싶은 레스토랑 정보를 선택해주세요~',
      trigger: '60301',
    },
    {
      id: '60301',
      options: [
        {
          value: 'RestaurantPlace',
          label: '레스토랑 위치',
          trigger: '60302',
        },
        {
          value: 'RestaurantTime',
          label: '레스토랑 영업시간',
          trigger: '60303',
        },
        {
          value: 'RestaurantPhone',
          label: '레스토랑 전화번호',
          trigger: '60304',
        },
      ],
    },
    {
      id: '60302',
      message: '레스토랑 위치는 ' + `${restaurant?.address || '레스토랑 위치 정보가 없습니다.'}`,
      trigger: '6030201',
    },
    { id: '6030201', message: '더 도움이 필요하신가요?', trigger: '6030202' },
    {
      id: '6030202',
      options: [
        {
          value: 'Yes',
          label: '네',
          trigger: '1',
        },
        {
          value: 'No',
          label: '아니요',
          end: true,
        },
      ],
    },
    {
      id: '60303',
      message: '아직 레스토랑 영업시간은 확인하실 수 없습니다.',
      trigger: '6030201',
    },
    {
      id: '60304',
      message:
        '레스토랑 전화번호는 ' + `${restaurant?.phone_number || '레스토랑 전화번호 정보가 없습니다.'}` + '입니다.',
      trigger: '6030201',
    },
    { id: '604', message: '알고 싶은 메뉴 정보를 선택해주세요~', trigger: '60401' },
    {
      id: '60401',
      options: [
        {
          value: 'AllMenu',
          label: '모든 메뉴 보기',
          trigger: '60402',
        },
        {
          value: 'Each Menu Info',
          label: '각 메뉴 정보',
          trigger: '60403',
        },
        {
          value: 'Recommend Menu',
          label: '대표 메뉴 추천',
          trigger: '60404',
        },
      ],
    },
    { id: '60402', message: '메뉴는 ' + menuNames + '가 있습니다.', trigger: '6030201' },
    { id: '60403', message: '어떤 메뉴에 대한 정보가 궁금하신가요?', trigger: '6040301' },
    {
      id: '6040301',
      options: menuOptions1,
    },
    ...(menuOptions1
      ? menuOptions1.map((menuOption, index) => ({
          id: `Menu${index + 1}01`,
          message: `${menuOption.label} 메뉴는 ${restaurant?.menus[index]?.category || '정보 없음'}이고, 가격은 ${
            restaurant?.menus[index]?.price.toLocaleString() || '정보 없음'
          }원 입니다. `,
          trigger: '6030201',
        }))
      : []),
    {
      id: '60404',
      message: '대표 메뉴는 ' + (menuOptions1 && menuOptions1[0] ? menuOptions1[0].label : '정보 없음') + '입니다.',
      trigger: '6030201',
    },

    { id: '605', message: '알고 싶은 정보를 선택해주세요~', trigger: '60501' },
    {
      id: '60501',
      options: [
        {
          value: 'Self Corner',
          label: '셀프 코너',
          trigger: '60502',
        },
        {
          value: 'Restroom',
          label: '화장실',
          trigger: '60503',
        },
        {
          value: 'Call Waiter',
          label: '점원 호출',
          trigger: '60504',
        },
        {
          value: 'Review',
          label: '리뷰 남기기',
          trigger: '60505',
        },
        {
          value: 'FAQ',
          label: '자주 묻는 질문(FAQ)',
          trigger: '60506',
        },
      ],
    },
    { id: '60502', message: '해당 매장은 셀프 코너가 따로 없습니다.', trigger: '6030201' },
    { id: '60503', message: '해당 매장 내에는 화장실이 없습니다.', trigger: '6030201' },
    { id: '60504', message: '점원을 호출하였습니다.', end: true },
    { id: '60505', message: '아직 리뷰를 남기실 수 없습니다.', end: true },
    { id: '60506', message: '자주 묻는 질문은 아직 없습니다.', trigger: '6030201' },
  ]

  return (
    <Container>
      <ThemeProvider theme={theme}>
        <StyleSheetManager
          shouldForwardProp={
            (prop) => prop !== 'floating' && prop !== 'floatingStyle' && prop !== 'opened' && prop !== 'invalid' // Exclude 'invalid' prop
          }
        >
          <GlobalStyle />
          <ChatBot steps={steps} hideHeader={true} />
        </StyleSheetManager>
      </ThemeProvider>
    </Container>
  )
}

export default ChatbotPage

const Container = styled.div`
  height: 100%;
`
const GlobalStyle = createGlobalStyle`
  // 기존 스타일 정의 부분
  .rsc-container {
    width: 100% !important;
    height: 100% !important;
  }
  .rsc-content {
    height: 85vh !important;
    background-color: ${({ theme }) => theme.COLOR.common.white[0]};
  }
  .rsc-footer {
    height: 15vh !important;
  }
`
