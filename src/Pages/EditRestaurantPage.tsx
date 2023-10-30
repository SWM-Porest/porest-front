import Header from 'Component/Header'
import { Image, Restaurant } from 'Context/restaurantContext'
import {
  AddCircle24Filled,
  ReOrder24Regular,
  SubtractCircle24Filled,
  DismissCircle24Filled,
} from '@fluentui/react-icons'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import ErrorPage from './ErrorPage'
import { useQuery, UseQueryResult } from 'react-query'
import { styled } from 'styled-components'
import Footer from 'Component/Footer'
import Loading from 'Component/Loading'
import { useForm } from 'react-hook-form'
import { Table } from 'Api/table'
import { FormItemContainer, FormItemInput, FormItemLabel, FormItmeHeader } from 'Component/Form/FormElement'

const EditRestaurantPage: React.FC = () => {
  const { id } = useParams()
  if (id === undefined) throw new Error('id가 없습니다.')

  const [restaurantImageList, setRestaurantImageList] = useState<Image[]>([])
  const { register, handleSubmit, reset } = useForm()
  // Create a query function for fetching restaurant data
  const fetchRestaurantData = async () => {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/restaurants/${id}`, {
      auth: {
        username: process.env.REACT_APP_BASIC_AUTH_USERNAME ? process.env.REACT_APP_BASIC_AUTH_USERNAME : 'myusername',
        password: process.env.REACT_APP_BASIC_AUTH_PASSWORD ? process.env.REACT_APP_BASIC_AUTH_PASSWORD : 'password123',
      },
    })
    return response.data
  }

  const fetchTableData = async () => {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/tables/restaurants/${id}/`, {
      auth: {
        username: process.env.REACT_APP_BASIC_AUTH_USERNAME ? process.env.REACT_APP_BASIC_AUTH_USERNAME : 'myusername',
        password: process.env.REACT_APP_BASIC_AUTH_PASSWORD ? process.env.REACT_APP_BASIC_AUTH_PASSWORD : 'password123',
      },
    })
    return response.data
  }

  const updateRestaurantImageList = (images: Image[]) => {
    setRestaurantImageList(images)
  }

  // Use the query function to fetch the restaurant data
  const {
    data: restaurant,
    isLoading,
    isError,
    refetch: refetchRestaurantData,
  }: UseQueryResult<Restaurant> = useQuery('restaurant', fetchRestaurantData, {
    onSuccess: (restaurant) => {
      reset({
        name: restaurant.name,
        intro: restaurant.intro,
        phone_number: restaurant.phone_number,
        address: restaurant.address,
      })

      restaurant.banner_images.forEach((image) => {
        image.path = `${process.env.REACT_APP_STATIC_URL}${image.path}`
      })

      updateRestaurantImageList(restaurant.banner_images)
    },
    staleTime: Infinity,
  })

  const { data: tableData, refetch: refetchTableData }: UseQueryResult<Table[]> = useQuery('table', fetchTableData)

  const unshiftImage = (image: Image) => {
    updateRestaurantImageList([image, ...restaurantImageList])
  }

  const addTable = async () => {
    let len = 0
    if (tableData !== undefined) len = tableData.length

    axios
      .post(`${process.env.REACT_APP_API_URL}/tables`, {
        restaurant_id: id,
        name: `${len + 1} 번째 테이블`,
      })
      .then(() => {
        refetchTableData()
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const deleteTable = async (table_id: string) => {
    axios
      .delete(`${process.env.REACT_APP_API_URL}/tables/${table_id}`)
      .then(() => {
        refetchTableData()
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const handleChange = (file: any) => {
    const new_banner_images: Image[] = []
    const formData = new FormData()

    for (let i = 0; i < file.target.files.length; i++) {
      formData.append('image', file.target.files[i])

      new_banner_images.push({
        filename: file.target.files[i].name,
        path: URL.createObjectURL(file.target.files[i]),
        type: file.target.files[i].type,
      } as Image)
    }

    axios
      .patch(`${process.env.REACT_APP_API_URL}/restaurants/${id}/images`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        auth: {
          username: process.env.REACT_APP_BASIC_AUTH_USERNAME
            ? process.env.REACT_APP_BASIC_AUTH_USERNAME
            : 'myusername',
          password: process.env.REACT_APP_BASIC_AUTH_PASSWORD
            ? process.env.REACT_APP_BASIC_AUTH_PASSWORD
            : 'password123',
        },
      })
      .then((response) => {
        for (let i = 0; i < new_banner_images.length; i++) {
          unshiftImage(new_banner_images[i])
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const deleteImage = (i: number) => {
    axios
      .delete(`${process.env.REACT_APP_API_URL}/restaurants/${id}/images/${restaurantImageList[i].filename}`, {
        auth: {
          username: process.env.REACT_APP_BASIC_AUTH_USERNAME
            ? process.env.REACT_APP_BASIC_AUTH_USERNAME
            : 'myusername',
          password: process.env.REACT_APP_BASIC_AUTH_PASSWORD
            ? process.env.REACT_APP_BASIC_AUTH_PASSWORD
            : 'password123',
        },
      })
      .then((response) => {
        if (i >= 0 && i < restaurantImageList.length) {
          setRestaurantImageList(restaurantImageList.filter((_, index) => i !== index))
        }
      })
      .catch((error) => {
        console.error(error)
      })
  }

  const onRetaurantEditSubmit = (data: any) => {
    // restaurantImageList.forEach((image) => {
    //   formData.append('banner_images', image)
    // })
    axios
      .patch(`${process.env.REACT_APP_API_URL}/restaurants/${id}`, data, {
        auth: {
          username: process.env.REACT_APP_BASIC_AUTH_USERNAME
            ? process.env.REACT_APP_BASIC_AUTH_USERNAME
            : 'myusername',
          password: process.env.REACT_APP_BASIC_AUTH_PASSWORD
            ? process.env.REACT_APP_BASIC_AUTH_PASSWORD
            : 'password123',
        },
      })
      .then((response) => {
        // console.log(response)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const uploadButton = (
    <UploadBtnContainer htmlFor="restaurantImage">
      <AddCircle24Filled />
      <div
        style={{
          marginTop: 8,
        }}
      >
        사진 추가
      </div>
    </UploadBtnContainer>
  )

  if (isLoading) {
    return <Loading />
  }
  if (isError) return <ErrorPage errorCode={500} />

  return (
    <div>
      <Header
        HeaderName={'가게 관리'}
        Right={
          <CompleteButton type="submit" form="form">
            완료
          </CompleteButton>
        }
      ></Header>
      <Container>
        <form id="form" onSubmit={handleSubmit(onRetaurantEditSubmit)}>
          <FormItemContainer>
            <FormItmeHeader>
              <FormItemLabel>가게 이름</FormItemLabel>
            </FormItmeHeader>
            <FormItemInput type="text" {...register('name')} />
          </FormItemContainer>
          <FormItemContainer>
            <FormItmeHeader>
              <FormItemLabel>가게 사진</FormItemLabel>
            </FormItmeHeader>
            <ImageListContainer>
              {restaurantImageList && restaurantImageList.length >= 6 ? null : uploadButton}
              {restaurantImageList && restaurantImageList.length > 0
                ? restaurantImageList.map((image, index) => {
                    return (
                      <ImageItem key={index}>
                        <div
                          style={{
                            position: 'absolute',
                            top: 0,
                            right: 0,
                          }}
                        >
                          <CustomDismiss
                            onClick={() => {
                              deleteImage(index)
                            }}
                          />
                        </div>

                        <ImageContainer src={image.path} />
                      </ImageItem>
                    )
                  })
                : null}
              <input
                type="file"
                id="restaurantImage"
                accept="image/*"
                style={{ visibility: 'hidden' }}
                onChange={handleChange}
                multiple
              />
            </ImageListContainer>
          </FormItemContainer>
          <FormItemContainer>
            <FormItmeHeader>
              <FormItemLabel>가게 설명</FormItemLabel>
            </FormItmeHeader>
            <FormItemInput type="text" {...register('intro')} />
          </FormItemContainer>
          <FormItemContainer>
            <FormItmeHeader>
              <FormItemLabel>연락처</FormItemLabel>
            </FormItmeHeader>
            <FormItemInput type="text" {...register('phone_number')} />
          </FormItemContainer>
          <FormItemContainer>
            <FormItmeHeader>
              <FormItemLabel>주소</FormItemLabel>
            </FormItmeHeader>
            <FormItemInput type="text" {...register('address')} />
          </FormItemContainer>
        </form>
        <FormHeader>
          <FormItmeHeader>
            <FormItemLabel>테이블</FormItemLabel>
            <div style={{ color: '#999999' }}>{tableData?.length}개</div>
          </FormItmeHeader>
        </FormHeader>
        <FormBody>
          {tableData &&
            tableData.map((table, index) => {
              return (
                <FormContent key={Date.now() + index}>
                  <div style={{ flex: 1 }}>
                    <SubtractCircle24Filled color="red" onClick={() => deleteTable(table._id)} />
                  </div>
                  <div style={{ flex: 6 }}>{table.name}</div>
                  <div style={{ flex: 1 }}>
                    <ReOrder24Regular color="#AAAAAA" />
                  </div>
                </FormContent>
              )
            })}
          <TableAddButton onClick={addTable}>
            <AddCircle24Filled /> <TableAddButtonText>테이블 추가</TableAddButtonText>
          </TableAddButton>
        </FormBody>
      </Container>
      <Footer />
    </div>
  )
}

export default EditRestaurantPage

const UploadBtnContainer = styled.label`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 6pt 6pt 0 0;

  min-width: 7.5rem;
  min-height: 7.5rem;
  max-width: 7.5rem;
  max-height: 7.5rem;

  color: #3fba73;
  background-color: rgba(63, 186, 115, 0.1);
  border-radius: 8pt;
  cursor: pointer;
`
const ImageItem = styled.div`
  position: relative;
`

const CustomDismiss = styled(DismissCircle24Filled)`
  cursor: pointer;
  background-color: white;
  maring: 4pt;
  border-radius: 50%;
`
const ImageListContainer = styled.div`
  display: flex;
  overflow-x: auto; /* 가로 스크롤 생성 */
  overflow-y: hidden; /* 세로 스크롤 생성 안함 */
  padding: 0 0 4pt 0;
`
const ImageContainer = styled.img`
  width: 7.5rem;
  height: 7.5rem;
  object-fit: cover;
  margin: 6pt 6pt 0 0;
  border-radius: 8pt;
`

const TableAddButtonText = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const TableAddButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #3fba73;
  background-color: rgba(63, 186, 115, 0.1);
  border-radius: 8pt;
  width: 100%;
  padding: 8pt;
  margin: 4pt 0 4pt 0;
  cursor: pointer;
  * {
    margin-right: 4pt;
  }
`

const FormContent = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 8pt;
  margin: 4pt 0 4pt 0;
  align-items: center;
  width: 100%;
  background-color: #fafafa;
  border-radius: 8pt;
  * {
    margin-right: 4pt;
    display: flex;
    align-items: center;
  }
`

const FormBody = styled.div``

const FormHeader = styled.div`
  display: flex;
  * {
    padding-right: 8pt;
  }
`

const CompleteButton = styled.button`
  border: 0;
  background-color: transparent;
  font-weight: bold;
  color: #3fba73;
  font-size: ${({ theme }) => theme.FONT_SIZE.tiny};
  cursor: pointer;
`
const Container = styled.div`
  width: 80%;
  margin: auto;
`
