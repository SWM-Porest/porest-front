import { AddCircle20Filled, ChevronRight20Regular, Image24Filled, ReOrder20Regular } from '@fluentui/react-icons'
import Header from 'Component/Header'
import Loading from 'Component/Loading'
import { Menu, Restaurant } from 'Context/restaurantContext'
import axios from 'axios'
import { UseQueryResult, useQuery } from 'react-query'
import { Link, useParams } from 'react-router-dom'
import { styled } from 'styled-components'
import { v4 as uuidv4 } from 'uuid'
import ErrorPage from './ErrorPage'

const EditMenuPage = () => {
  const { id } = useParams()
  if (id === undefined) {
    return <ErrorPage />
  }

  const fetchRestaurant = async () => {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/restaurants/${id}`)

    return response.data
  }

  const {
    data: restaurant,
    error,
    isLoading,
  }: UseQueryResult<Restaurant> = useQuery(['restaurant', id], fetchRestaurant)

  if (isLoading) {
    return <Loading />
  }

  if (error) {
    return <ErrorPage />
  }

  const addCategory = async () => {
    const newCategory = prompt('추가할 카테고리를 입력해주세요') as string

    const res = await axios.post(`${process.env.REACT_APP_API_URL}/restaurants/${id}/categories`, null, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      },
      params: {
        category: newCategory,
      },
    })

    if (res.status !== 201) {
      alert('카테고리 추가에 실패했습니다.')
    }
  }

  return (
    <>
      <Header HeaderName="메뉴 관리" />
      <EditMenuPageBody>
        <CategoryList>
          {restaurant &&
            restaurant.category.map((c) => {
              return (
                <CategoryItem key={uuidv4()}>
                  <CategoryHeader>
                    <div>
                      <span>{c}</span> <ChevronRight20Regular color="#AAAAAA" />
                    </div>
                    <ReOrder20Regular color="#AAAAAA" />
                  </CategoryHeader>
                  <CategoryBody>
                    <MenuList>
                      {restaurant.menus &&
                        restaurant.menus.map((menu: Menu) => {
                          if (menu.category === c)
                            return (
                              <MenuItem
                                key={uuidv4()}
                                to={`/restaurants/${id}/menus/edit`}
                                state={{ category: c, menu: menu }}
                                style={{ textDecoration: 'none', color: '#000000' }}
                              >
                                <MenuImage>
                                  {menu.img && menu.img.path ? (
                                    <img src={process.env.REACT_APP_STATIC_URL + menu.img.path} alt="" />
                                  ) : (
                                    <Image24Filled color="#CCCCCC" />
                                  )}
                                </MenuImage>
                                <MenuBody>
                                  <MenuName>{menu.name}</MenuName>
                                  {/* <MenuDiscount>
                                    <DiscountPercentage>20%</DiscountPercentage>
                                    <OriginalPrice>100,000원</OriginalPrice>
                                  </MenuDiscount> */}
                                  <MenuPrice>{menu.price.toLocaleString()}원</MenuPrice>
                                </MenuBody>
                                <ReOrder20Regular color="#AAAAAA" />
                              </MenuItem>
                            )
                        })}
                    </MenuList>
                    <Link
                      to={`/restaurants/${id}/menus/edit`}
                      state={{ category: c }}
                      style={{ textDecoration: 'none' }}
                    >
                      <MenuAddButtonWrapper>
                        <MenuAddButton>
                          <AddCircle20Filled color="#3FBA73" />
                          메뉴 추가
                        </MenuAddButton>
                      </MenuAddButtonWrapper>
                    </Link>
                  </CategoryBody>
                </CategoryItem>
              )
            })}
        </CategoryList>
        <CategoryAddButtonWrapper onClick={addCategory}>
          <CategoryAddButton>카테고리 추가</CategoryAddButton>
        </CategoryAddButtonWrapper>
      </EditMenuPageBody>
    </>
  )
}

export default EditMenuPage

const MenuAddButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

const MenuAddButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #3fba73;
  font-size: ${({ theme }) => theme.FONT_SIZE.medium};
  font-weight: bold;
  width: 35rem;
  height: 5.2rem;
  border-radius: 1.2rem;
  background-color: rgba(63, 186, 115, 0.1);
  * {
    margin-right: 0.8rem;
  }
`

const OriginalPrice = styled.span`
  text-decoration: line-through;
  color: #999999;
  margin-left: 0.4rem;
`
const DiscountPercentage = styled.span`
  color: #3fba73;
  font-weight: bold;
`

const MenuDiscount = styled.div`
  font-size: ${({ theme }) => theme.FONT_SIZE.small};
`
const MenuPrice = styled.div`
  font-size: ${({ theme }) => theme.FONT_SIZE.large};
  font-weight: bold;
`
const MenuName = styled.div`
  font-size: ${({ theme }) => theme.FONT_SIZE.large};
`
const MenuBody = styled.div`
  display: flex;
  flex-direction: column;
  width: calc(100% - 6.4rem - 20px);
  justify-content: space-between;
  height: 100%;
  padding: 1.6rem;
`
const MenuImage = styled.div`
  width: 6.4rem;
  height: 6.4rem;

  * {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 1.2rem;
  }
`
const MenuItem = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`
const MenuList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const CategoryBody = styled.div``

const EditMenuPageBody = styled.div`
  padding: 20pt;
`

const CategoryHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: ${({ theme }) => theme.FONT_SIZE.big};
  font-weight: bold;
`

const CategoryItem = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 2rem;
`

const CategoryList = styled.div``

const CategoryAddButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`
const CategoryAddButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #3fba73;
  color: #ffffff;
  font-size: ${({ theme }) => theme.FONT_SIZE.medium};
  width: 35rem;
  height: 5.6rem;
  border-radius: 1.2rem;
  position: fixed;
  bottom: 1rem;
  font-weight: bold;
`
