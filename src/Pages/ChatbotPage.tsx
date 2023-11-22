import { ChevronLeft20Filled, Image24Filled } from '@fluentui/react-icons'
import { MenuOption } from 'Api/OrderInterface'
import { removeAllCookie, setCookie } from 'Api/cartCookie'
import { getCookie, useAccessToken } from 'Api/tokenCookie'
import useUserData from 'Api/useUserData'
import Header from 'Component/Header'
import Loading from 'Component/Loading'
import OptionSelector from 'Component/MenuComponent/OptionSelector'
import { Menu, getRestaurant, useRestaurantDispatch, useRestaurantState } from 'Context/restaurantContext'
import ErrorPage from 'Pages/ErrorPage'
import AmountCheck from 'Utils/AmountCheck'
import { ReactComponent as ChatBot } from 'assets/Group 19.svg'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import styled from 'styled-components'

interface CartItem {
  menu: Menu | undefined
  options: MenuOption[]
  quantity: number | undefined
}
interface SelectedOption {
  name: string
  price: number
}

interface SelectedOptions {
  [key: string]: SelectedOption[]
}
type MenuType = {
  menu_name: string
  quantity: number
  options: OptionType[]
  price: number
}

type OptionType = {
  name: string
  items: ItemType[]
}

type ItemType = {
  name: string
  price: number
}

const ChatbotPage: React.FC = () => {
  const { id } = useParams()
  if (id === undefined) throw new Error('id가 없습니다.')
  const dispatch = useRestaurantDispatch()
  const { data: restaurant, loading, error } = useRestaurantState().restaurant
  const cookie = getCookie(restaurant?._id as string) || {}
  const parsedCookie = JSON.parse(JSON.stringify(cookie))
  const [isLoaded, setIsLoaded] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [previousStep, setPreviousStep] = useState<number[]>([])
  const [selectedMenu, setSelectedMenu] = useState<Menu | undefined>(undefined)
  const [infoMenu, setInfoMenu] = useState<Menu | undefined>(undefined)
  const [selectedQuantity, setSelectedQuantity] = useState(1)
  const [selectedOptions, setSelectedOptions] = useState<SelectedOptions>({})
  const [cart, setCart] = useState<CartItem[]>([])
  const [accessToken, setAccessToken] = useAccessToken()
  const { data: userData } = useUserData(accessToken)
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const handleButtonClick = (step: number) => {
    setPreviousStep((prevSteps) => [...prevSteps, currentStep])
    setCurrentStep(step)
  }

  const handleMenuSelect = (menu: Menu) => {
    setPreviousStep((prevSteps) => [...prevSteps, currentStep])
    setSelectedMenu(menu)
    if (!menu.menuOptions || menu.menuOptions.length === 0) {
      setCurrentStep(3)
    } else {
      setCurrentStep(currentStep + 1)
    }
  }
  const handleMenuInfo = (menu: Menu) => {
    setPreviousStep((prevSteps) => [...prevSteps, currentStep])
    setInfoMenu(menu)
    setCurrentStep(402)
  }
  const handleIncrement = () => {
    setSelectedQuantity(selectedQuantity + 1)
  }

  const handleDecrement = () => {
    if (selectedQuantity === 1) return
    setSelectedQuantity(selectedQuantity - 1)
  }

  const handleOptionSelect = (optionId: string, selectedItems: string[]) => {
    const selectedOptionObjects = selectedItems.map((item) => ({
      name: item,
      price:
        selectedMenu?.menuOptions
          .find((option) => option._id === optionId)
          ?.items.find((optItem) => optItem.name === item)?.price || 0,
    }))

    setSelectedOptions((prevSelectedOptions) => ({
      ...prevSelectedOptions,
      [optionId]: selectedOptionObjects,
    }))
  }

  const handleAddToCart = () => {
    setPreviousStep((prevSteps) => [...prevSteps, currentStep])
    if (!selectedMenu || !selectedQuantity) {
      alert('메뉴와 수량을 선택해주세요.')
      setCurrentStep(0)
      return
    }

    const formattedOptions: MenuOption[] = []
    for (const optionId in selectedOptions) {
      if (Object.prototype.hasOwnProperty.call(selectedOptions, optionId)) {
        formattedOptions.push(
          ...selectedOptions[optionId].map((item) => ({
            _id: optionId,
            name: selectedMenu?.menuOptions.find((option) => option._id === optionId)?.name || '',
            isSoldOut: selectedMenu?.menuOptions.find((option) => option._id === optionId)?.isSoldOut || false,
            maxSelect: selectedMenu?.menuOptions.find((option) => option._id === optionId)?.maxSelect || 1,
            isRequired: selectedMenu?.menuOptions.find((option) => option._id === optionId)?.isRequired || false,
            items: [
              {
                name: item.name,
                price: item.price,
              },
            ],
          })),
        )
      }
    }

    const newItem: CartItem = {
      menu: selectedMenu,
      options: formattedOptions,
      quantity: selectedQuantity,
    }

    setCookie(restaurant?._id as string, selectedMenu, selectedQuantity, formattedOptions)

    setCart((prevCart) => [...prevCart, newItem])
    setCurrentStep(5)
    setSelectedMenu(undefined)
    setSelectedQuantity(1)
    setSelectedOptions({})
  }

  const handleCompleteOrder = async () => {
    const menus = cookie
    if (!accessToken) {
      showMessage('로그인을 진행해주세요.', 1500, '/img/close.png')
      navigate('/login')
      return
    }

    if (Object.keys(menus).length === 0) {
      showMessage('주문할 메뉴가 없습니다.\n주문할 메뉴를 담아주세요.', 1500, '/img/close.png')

      return
    }
    try {
      createOrder(null)
    } catch (error) {
      console.error('주문 생성 중 오류 발생:', error)
    }
    //
  }
  const createOrder = async (pushSubscription: string | null) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/orders`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        restaurant_id: restaurant?._id,
        restaurant_name: restaurant?.name,
        restaurant_address: restaurant?.address,
        table_id: 1,
        menus: JSON.parse(JSON.parse(JSON.stringify(cookie))),
        token: pushSubscription,
      }),
    })

    if (response.ok) {
      handleRemoveMenu()
      showMessage('주문이 완료되었습니다.\n접수 확인을 기다려주십시오.', 1500, '/img/check.png')
      response.json().then((data) => {
        navigate(`/orderlist?orderId=${data._id}`)
      })
    } else {
      console.error('주문 생성에 실패했습니다.')
    }
  }
  const handleRemoveMenu = () => {
    removeAllCookie(restaurant?._id as string)
  }

  useEffect(() => {
    getRestaurant(dispatch, id).then(() => {
      setIsLoaded(true)
    })
  }, [dispatch, id])

  if (!isLoaded) {
    return <Loading />
  }
  if (error) return <ErrorPage errorCode={500} />
  if (!restaurant) return <ErrorPage errorCode={404} />

  if (!userData) {
    return <div>No orders found.</div>
  }

  return (
    <div>
      <Header
        Left={
          <Icon onClick={() => navigate(`/restaurants/${id}`)}>
            <ChevronLeft20Filled color="#212121" />
          </Icon>
        }
        HeaderName={'AI PORO'}
        Right={
          <ChatBotIcon>
            <ChatBot width="2.4rem" height="2.4rem" />
          </ChatBotIcon>
        }
      ></Header>
      <StyledDiv>
        {previousStep.map((step, index) => (
          <StyledDiv key={index}>
            {step === 0 && (
              <div>
                <RecieveContainer>
                  <RecieveBox>
                    <RecieveMessage>{userData.nickname}님, 안녕하세요. </RecieveMessage>
                  </RecieveBox>
                </RecieveContainer>
              </div>
            )}
            {step === 1 && (
              <div>
                <SendContainer>
                  <SendBox>
                    <SendMessage>주문하기</SendMessage>
                  </SendBox>
                </SendContainer>
                <RecieveContainer>
                  <RecieveBox>
                    <RecieveMessage>메뉴를 선택하셨습니다.</RecieveMessage>
                  </RecieveBox>
                </RecieveContainer>
              </div>
            )}
            {step === 2 && (
              <RecieveContainer>
                <RecieveBox>
                  <RecieveMessage>옵션을 선택하셨습니다.</RecieveMessage>
                </RecieveBox>
              </RecieveContainer>
            )}
            {step === 3 && (
              <RecieveContainer>
                <RecieveBox>
                  <RecieveMessage>수량을 선택하셨습니다.</RecieveMessage>
                </RecieveBox>
              </RecieveContainer>
            )}
            {step === 4 && (
              <RecieveContainer>
                <RecieveBox>
                  <RecieveMessage>장바구니에 넣으셨습니다.</RecieveMessage>
                </RecieveBox>
              </RecieveContainer>
            )}
            {step === 401 && (
              <RecieveContainer>
                <RecieveBox>
                  <RecieveMessage>다른 메뉴를 장바구니에 담으시겠습니까?</RecieveMessage>
                </RecieveBox>
              </RecieveContainer>
            )}
            {step === 5 && (
              <RecieveContainer>
                <RecieveBox>
                  <RecieveMessage>주문하시겠습니까? 다른 메뉴를 더 담으시겠습니까?</RecieveMessage>
                </RecieveBox>
              </RecieveContainer>
            )}
            {step === 200 && (
              <div>
                <SendContainer>
                  <SendBox>
                    <SendMessage>기타</SendMessage>
                  </SendBox>
                </SendContainer>
                <RecieveContainer>
                  <RecieveBox>
                    <RecieveMessage>기타 서비스를 선택하셨습니다.</RecieveMessage>
                  </RecieveBox>
                </RecieveContainer>
              </div>
            )}
            {step === 300 && (
              <div>
                <SendContainer>
                  <SendBox>
                    <SendMessage>레스토랑 정보</SendMessage>
                  </SendBox>
                </SendContainer>
                <RecieveContainer>
                  <RecieveBox>
                    <RecieveMessage>레스토랑 정보를 선택하셨습니다.</RecieveMessage>
                  </RecieveBox>
                </RecieveContainer>
              </div>
            )}
            {step === 301 && (
              <div>
                <SendContainer>
                  <SendBox>
                    <SendMessage>레스토랑 이름</SendMessage>
                  </SendBox>
                </SendContainer>
                <RecieveContainer>
                  <RecieveBox>
                    <RecieveMessage>레스토랑 이름: {restaurant.name}</RecieveMessage>
                  </RecieveBox>
                </RecieveContainer>
              </div>
            )}
            {step === 302 && (
              <div>
                <SendContainer>
                  <SendBox>
                    <SendMessage>레스토랑 주소</SendMessage>
                  </SendBox>
                </SendContainer>
                <RecieveContainer>
                  <RecieveBox>
                    <RecieveMessage>레스토랑 주소: {restaurant.address}</RecieveMessage>
                  </RecieveBox>
                </RecieveContainer>
              </div>
            )}
            {step === 303 && (
              <div>
                <SendContainer>
                  <SendBox>
                    <SendMessage>레스토랑 전화번호</SendMessage>
                  </SendBox>
                </SendContainer>
                <RecieveContainer>
                  <RecieveBox>
                    <RecieveMessage>레스토랑 전화번호: {restaurant.phone_number}</RecieveMessage>
                  </RecieveBox>
                </RecieveContainer>
              </div>
            )}
            {step === 304 && (
              <div>
                <SendContainer>
                  <SendBox>
                    <SendMessage>레스토랑 소개</SendMessage>
                  </SendBox>
                </SendContainer>
                <RecieveContainer>
                  <RecieveBox>
                    <RecieveMessage>레스토랑 소개: {restaurant.intro}</RecieveMessage>
                  </RecieveBox>
                </RecieveContainer>
              </div>
            )}
            {step === 400 && (
              <div>
                <SendContainer>
                  <SendBox>
                    <SendMessage>메뉴 정보</SendMessage>
                  </SendBox>
                </SendContainer>
                <RecieveContainer>
                  <RecieveBox>
                    <RecieveMessage>메뉴 정보를 선택하셨습니다.</RecieveMessage>
                  </RecieveBox>
                </RecieveContainer>
              </div>
            )}
            {step === 401 && (
              <div>
                <SendContainer>
                  <SendBox>
                    <SendMessage>메뉴 정보</SendMessage>
                  </SendBox>
                </SendContainer>
                <RecieveContainer>
                  <RecieveBox>
                    <RecieveMessage>메뉴 정보를 선택하셨습니다.</RecieveMessage>
                  </RecieveBox>
                </RecieveContainer>
              </div>
            )}
          </StyledDiv>
        ))}
        {currentStep === 0 && (
          <StyledDiv>
            <RecieveContainer>
              <RecieveBox>
                <RecieveMessage>{userData.nickname}님, 안녕하세요. </RecieveMessage>
                <RecieveMessage>어떤 도움이 필요하신가요?</RecieveMessage>
              </RecieveBox>
            </RecieveContainer>
            <SendContainer>
              <StyledButton onClick={() => handleButtonClick(1)}>주문하기</StyledButton>
              <StyledButton onClick={() => handleButtonClick(200)}>기타</StyledButton>
            </SendContainer>
          </StyledDiv>
        )}
        {currentStep === 1 && (
          <StyledDiv>
            <SendContainer>
              <SendBox>
                <SendMessage>주문하기</SendMessage>
              </SendBox>
            </SendContainer>
            <RecieveContainer>
              <RecieveBox>
                <RecieveMessage>주문하기를 선택하셨습니다. 메뉴를 선택해주세요.</RecieveMessage>
              </RecieveBox>
            </RecieveContainer>
            <MenuCardContainer>
              {restaurant?.menus.map((menu, index) => (
                <MenuCard key={index} onClick={() => handleMenuSelect(menu)}>
                  {menu.img && menu.img.path ? (
                    <img
                      style={{ width: '120px', height: '120px', borderRadius: '12px 12px 0px 0px' }}
                      src={process.env.REACT_APP_STATIC_URL + menu.img.path}
                      alt=""
                    />
                  ) : (
                    <Image24Filled style={{ width: '120px', height: '120px' }} color="#CCCCCC" />
                  )}
                  <MenuCardDesContainer>
                    <MenuName>{menu.name}</MenuName>
                    <MenuPrice>{menu.price.toLocaleString()}원</MenuPrice>
                  </MenuCardDesContainer>
                </MenuCard>
              ))}
            </MenuCardContainer>
          </StyledDiv>
        )}
        {currentStep === 2 && (
          <StyledDiv>
            <RecieveContainer>
              <RecieveBox>
                <RecieveMessage>옵션을 선택해주세요.</RecieveMessage>
              </RecieveBox>
            </RecieveContainer>
            {selectedMenu?.menuOptions &&
              selectedMenu?.menuOptions.map((option) => {
                return option._id !== null ? (
                  <OptionSelector
                    key={option._id}
                    option={option}
                    selectedItems={selectedOptions[option._id]?.map((item) => item.name) || []}
                    onSelect={(selectedItems) => handleOptionSelect(option._id ?? '', selectedItems)}
                  />
                ) : (
                  <></>
                )
              })}
            <SendContainer>
              <StyledButton
                onClick={() => {
                  setCurrentStep(3)
                  setPreviousStep((prevSteps) => [...prevSteps, 2])
                }}
              >
                옵션 선택 완료
              </StyledButton>
            </SendContainer>
          </StyledDiv>
        )}
        {currentStep === 3 && (
          <StyledDiv>
            <RecieveContainer>
              <RecieveBox>
                <RecieveMessage>수량을 선택해주세요.</RecieveMessage>
              </RecieveBox>
            </RecieveContainer>
            <StyledAmountContainer>
              <AmountCheck
                count={selectedQuantity}
                handleIncrement={handleIncrement}
                handleDecrement={handleDecrement}
              />
              <StyledButton
                onClick={() => {
                  setCurrentStep(currentStep + 1)
                  setPreviousStep((prevSteps) => [...prevSteps, currentStep])
                }}
              >
                수량선택 완료
              </StyledButton>
            </StyledAmountContainer>
          </StyledDiv>
        )}
        {currentStep === 4 && (
          <StyledDiv>
            <RecieveContainer>
              <RecieveBox>
                {selectedMenu && <MenuMessage>{selectedMenu.name}</MenuMessage>}
                {Object.keys(selectedOptions).map((optionId) => (
                  <OptionMessage>
                    {selectedMenu?.menuOptions.find((option) => option._id === optionId)?.name || ''}:
                    {selectedOptions[optionId].map((item) => item.name).join(', ')}
                  </OptionMessage>
                ))}
                {selectedQuantity && <QuantityMessage>{selectedQuantity}개</QuantityMessage>}
                <RecieveMessage>장바구니에 넣겠습니까?</RecieveMessage>
              </RecieveBox>
            </RecieveContainer>
            <SendContainer>
              <StyledButton onClick={handleAddToCart}>예</StyledButton>
              <StyledButton onClick={() => setCurrentStep(401)}>아니요</StyledButton>
            </SendContainer>
          </StyledDiv>
        )}
        {currentStep === 401 && (
          <StyledDiv>
            <RecieveContainer>
              <RecieveBox>
                <RecieveMessage>다른 메뉴를 장바구니에 담으시겠습니까?</RecieveMessage>
              </RecieveBox>
            </RecieveContainer>
            <SendContainer>
              <StyledButton onClick={() => setCurrentStep(1)}>예</StyledButton>
              <StyledButton onClick={() => setCurrentStep(0)}>아니요</StyledButton>
            </SendContainer>
          </StyledDiv>
        )}
        {currentStep === 5 && (
          <StyledDiv>
            <RecieveContainer>
              <RecieveBox>
                {(Object.values(JSON.parse(parsedCookie)) as MenuType[]).map((menu, index) => {
                  const optionPrice =
                    menu.options?.reduce((total, option) => {
                      const itemPrice = option.items?.reduce((total, item) => total + item.price, 0) || 0
                      return total + itemPrice
                    }, 0) || 0

                  const totalPrice = menu.quantity * (menu.price + optionPrice)

                  return (
                    <div
                      key={index}
                      style={{
                        border: '1px solid #ddd',
                        borderRadius: '5px',
                        padding: '10px',
                        marginBottom: '10px',
                        boxShadow: '0px 0px 5px rgba(0,0,0,0.1)',
                      }}
                    >
                      <RecieveMessage>메뉴: {menu.menu_name}</RecieveMessage>
                      {menu.options &&
                        menu.options.map((option, index) => (
                          <div key={index}>
                            {option.items &&
                              option.items.map((item, index) => (
                                <RecieveMessage key={index}>
                                  {option.name}: {item.name}, 가격: {item.price.toLocaleString()}원
                                </RecieveMessage>
                              ))}
                          </div>
                        ))}
                      <RecieveMessage>수량: {menu.quantity}</RecieveMessage>
                      <RecieveMessage>총 가격: {totalPrice.toLocaleString()}원</RecieveMessage>
                    </div>
                  )
                })}
                <RecieveMessage>주문하시겠습니까?</RecieveMessage>
              </RecieveBox>
            </RecieveContainer>
            <SendContainer>
              <StyledButton onClick={handleCompleteOrder}>주문하기</StyledButton>
              <StyledButton onClick={() => setCurrentStep(1)}>다른 메뉴 담기</StyledButton>
              <StyledButton onClick={() => setCurrentStep(0)}>그만하기</StyledButton>
            </SendContainer>
          </StyledDiv>
        )}
        {currentStep === 200 && (
          <StyledDiv>
            <SendContainer>
              <SendBox>
                <SendMessage>기타</SendMessage>
              </SendBox>
            </SendContainer>
            <RecieveContainer>
              <RecieveBox>
                <RecieveMessage>기타 서비스를 선택하셨습니다.</RecieveMessage>
              </RecieveBox>
            </RecieveContainer>
            <div>
              <SendContainer>
                <StyledButton onClick={() => handleButtonClick(300)}>레스토랑 정보</StyledButton>
                <StyledButton onClick={() => handleButtonClick(400)}>메뉴 정보</StyledButton>
                <StyledStartButton onClick={() => handleButtonClick(0)}>처음으로</StyledStartButton>
              </SendContainer>
            </div>
          </StyledDiv>
        )}
        {currentStep === 300 && (
          <StyledDiv>
            <SendContainer>
              <SendBox>
                <SendMessage>레스토랑 정보</SendMessage>
              </SendBox>
            </SendContainer>
            <RecieveContainer>
              <RecieveBox>
                <RecieveMessage>레스토랑 정보를 선택하셨습니다.</RecieveMessage>
              </RecieveBox>
            </RecieveContainer>
            <SendContainer>
              <StyledButton onClick={() => handleButtonClick(301)}>레스토랑 이름</StyledButton>
              <StyledButton onClick={() => handleButtonClick(302)}>레스토랑 주소</StyledButton>
              <StyledButton onClick={() => handleButtonClick(303)}>레스토랑 전화번호</StyledButton>
              <StyledButton onClick={() => handleButtonClick(304)}>레스토랑 소개</StyledButton>
              <StyledStartButton onClick={() => handleButtonClick(0)}>처음으로</StyledStartButton>
            </SendContainer>
          </StyledDiv>
        )}
        {currentStep === 301 && (
          <StyledDiv>
            <SendContainer>
              <SendBox>
                <SendMessage>레스토랑 이름</SendMessage>
              </SendBox>
            </SendContainer>
            <RecieveContainer>
              <RecieveBox>
                <RecieveMessage>레스토랑 이름: {restaurant.name}</RecieveMessage>
              </RecieveBox>
            </RecieveContainer>
            <SendContainer>
              <StyledStartButton onClick={() => handleButtonClick(0)}>처음으로</StyledStartButton>
            </SendContainer>
          </StyledDiv>
        )}
        {currentStep === 302 && (
          <StyledDiv>
            <SendContainer>
              <SendBox>
                <SendMessage>레스토랑 주소</SendMessage>
              </SendBox>
            </SendContainer>
            <RecieveContainer>
              <RecieveBox>
                <RecieveMessage>레스토랑 주소: {restaurant.address}</RecieveMessage>
              </RecieveBox>
            </RecieveContainer>
            <SendContainer>
              <StyledStartButton onClick={() => handleButtonClick(0)}>처음으로</StyledStartButton>
            </SendContainer>
          </StyledDiv>
        )}
        {currentStep === 303 && (
          <StyledDiv>
            <SendContainer>
              <SendBox>
                <SendMessage>레스토랑 전화번호</SendMessage>
              </SendBox>
            </SendContainer>
            <RecieveContainer>
              <RecieveBox>
                <RecieveMessage>레스토랑 전화번호: {restaurant.phone_number}</RecieveMessage>
              </RecieveBox>
            </RecieveContainer>
            <SendContainer>
              <StyledStartButton onClick={() => handleButtonClick(0)}>처음으로</StyledStartButton>
            </SendContainer>
          </StyledDiv>
        )}
        {currentStep === 304 && (
          <StyledDiv>
            <SendContainer>
              <SendBox>
                <SendMessage>레스토랑 소개</SendMessage>
              </SendBox>
            </SendContainer>
            <RecieveContainer>
              <RecieveBox>
                <RecieveMessage>레스토랑 소개: {restaurant.intro}</RecieveMessage>
              </RecieveBox>
            </RecieveContainer>
            <SendContainer>
              <StyledStartButton onClick={() => handleButtonClick(0)}>처음으로</StyledStartButton>
            </SendContainer>
          </StyledDiv>
        )}
        {currentStep === 400 && (
          <StyledDiv>
            <SendContainer>
              <SendBox>
                <SendMessage>메뉴 정보</SendMessage>
              </SendBox>
            </SendContainer>
            <RecieveContainer>
              <RecieveBox>
                <RecieveMessage>메뉴 정보를 선택하셨습니다.</RecieveMessage>
                <RecieveMessage>정보를 원하시는 메뉴를 선택해주세요.</RecieveMessage>
              </RecieveBox>
            </RecieveContainer>
            <SendContainer>
              {restaurant?.menus.map((menu, index) => (
                <StyledButton
                  key={index}
                  onClick={() => {
                    handleMenuInfo(menu)
                  }}
                >
                  {menu.name}
                </StyledButton>
              ))}
              <StyledStartButton onClick={() => handleButtonClick(0)}>처음으로</StyledStartButton>
            </SendContainer>
          </StyledDiv>
        )}
        {currentStep === 402 && infoMenu && (
          <StyledDiv>
            <SendContainer>
              <SendBox>
                <SendMessage>{infoMenu.name}</SendMessage>
              </SendBox>
            </SendContainer>
            <RecieveContainer>
              <RecieveBox>
                <h2 style={{ margin: '0 0 20px 0' }}>{infoMenu.name}</h2>
                <RecieveMessage>카테고리: {infoMenu.category}</RecieveMessage>
                <RecieveMessage>가격: {infoMenu.price}</RecieveMessage>
                <RecieveMessage>설명: {infoMenu.description}</RecieveMessage>
                {infoMenu.menuOptions.length > 0 && (
                  <RecieveMessage>옵션: {infoMenu.menuOptions.map((option) => option.name).join(', ')}</RecieveMessage>
                )}
              </RecieveBox>
            </RecieveContainer>
            <SendContainer>
              <StyledStartButton onClick={() => setCurrentStep(400)}>다른 메뉴 선택하기</StyledStartButton>
              <StyledStartButton onClick={() => handleButtonClick(0)}>처음으로</StyledStartButton>
            </SendContainer>
          </StyledDiv>
        )}
      </StyledDiv>
    </div>
  )
}

export default ChatbotPage

const showMessage = (messageText: string, duration: number, img: string) => {
  const messageContainer = document.createElement('div')
  messageContainer.style.zIndex = '9999'
  messageContainer.style.display = 'flex'
  messageContainer.style.alignItems = 'center'
  messageContainer.style.width = '280px'
  messageContainer.style.whiteSpace = 'pre-wrap'

  const image = new Image()
  image.src = img
  image.style.width = '2rem'
  image.style.height = '2rem'
  image.style.marginRight = '1rem'

  const textContainer = document.createElement('div')
  textContainer.textContent = messageText
  textContainer.style.fontSize = '1.8rem'
  textContainer.style.fontWeight = '600'

  messageContainer.appendChild(image)
  messageContainer.appendChild(textContainer)

  const containerStyle = messageContainer.style
  containerStyle.position = 'fixed'
  containerStyle.top = '2rem'
  containerStyle.left = '50%'
  containerStyle.transform = 'translateX(-50%)'
  containerStyle.backgroundColor = '#fff'
  containerStyle.color = '#333'
  containerStyle.padding = '1rem 2.4rem'
  containerStyle.borderRadius = '1rem'
  containerStyle.opacity = '0'
  containerStyle.transition = 'opacity 0.3s'

  document.body.appendChild(messageContainer)

  setTimeout(() => {
    containerStyle.opacity = '1'
  }, 100)

  setTimeout(() => {
    containerStyle.opacity = '0'
    setTimeout(() => {
      document.body.removeChild(messageContainer)
    }, 300)
  }, duration)
  if (window.innerWidth >= 800) {
    containerStyle.left = `calc(50% + ${430 / 2}px)`
  }
}

const StyledButton = styled.button`
  display: inline-block;
  margin: 5px 8px 5px 0;
  padding: 16px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 16px;
  background: ${({ theme }) => theme.COLOR.main};
  color: ${({ theme }) => theme.COLOR.common.white[0]};
  cursor: pointer;
  &:hover {
    background-color: ${({ theme }) => theme.COLOR.hover};
    color: ${({ theme }) => theme.COLOR.common.gray[20]};
  }
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);
`
const StyledStartButton = styled(StyledButton)`
  background-color: ${({ theme }) => theme.COLOR.sub};
  color: ${({ theme }) => theme.COLOR.common.gray[20]};

  &:hover {
    background: ${({ theme }) => theme.COLOR.hover};
    color: ${({ theme }) => theme.COLOR.common.gray[20]};
  }
`

const StyledDiv = styled.div`
  margin: 10px;
`
const RecieveContainer = styled.div`
  display: flex;
  justify-content: flex-start;
`

const RecieveBox = styled.div`
  background-color: #fafafa;
  padding: 16px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 1px 18px 18px 18px;
  margin: 10px 0;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);
`

const RecieveMessage = styled.p`
  color: ${({ theme }) => theme.COLOR.common.gray[20]};
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 22px;
  margin: 0;
`

const Icon = styled.div`
  cursor: pointer;
  display: flex;
  padding: 0.8rem;
  flex-direction: column;
  align-items: flex-start;
  border-radius: 2.8rem;
`
const ChatBotIcon = styled(Icon)`
  cursor: default;
  background: ${({ theme }) => theme.COLOR.focus};
`

const MenuCard = styled.div`
  display: flex;
  padding-bottom: 0px;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  border-radius: 12px;
  background: #fafafa;
  width: fit-content;
  margin-bottom: 16px;
`

const SendContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  flex-wrap: wrap;
`

const SendBox = styled.div`
  display: flex;
  padding: 16px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 18px 18px 1px 18px;
  background: ${({ theme }) => theme.COLOR.main};
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);
`

const SendMessage = styled.p`
  color: ${({ theme }) => theme.COLOR.common.white[0]};
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  margin: 0;
  width: fit-content;
`

const MenuCardDesContainer = styled.div`
  display: flex;
  width: 120px;
  padding: 0px 8px;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
`

const MenuName = styled.p`
  color: #212121;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 18px;
  margin: 0;
`

const MenuPrice = styled.p`
  color: #212121;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: 18px;
  margin: 0;
`

const MenuCardContainer = styled.div`
  display: flex;
  overflow-x: auto;
  gap: 16px;
  padding-bottom: 16px;
`
const StyledAmountContainer = styled.div`
  display: flex;
  justify-content: space-between;
`

const MenuMessage = styled(RecieveMessage)`
  font-size: 20px;
  font-weight: bold;
  color: #333;
`

const OptionMessage = styled(RecieveMessage)`
  font-size: 16px;
  color: #666;
`

const QuantityMessage = styled(RecieveMessage)`
  font-size: 18px;
  color: #999;
`
