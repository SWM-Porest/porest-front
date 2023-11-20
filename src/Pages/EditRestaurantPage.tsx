import Header from 'Component/Header'
import { Image, Restaurant } from 'Context/restaurantContext'
import {
  AddCircle24Filled,
  ReOrder24Regular,
  SubtractCircle24Filled,
  DismissCircle24Filled,
  ChevronLeft20Regular,
} from '@fluentui/react-icons'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import ErrorPage from './ErrorPage'
import { useQuery, UseQueryResult } from 'react-query'
import { styled } from 'styled-components'
import Footer from 'Component/Footer'
import Loading from 'Component/Loading'
import { useForm } from 'react-hook-form'
import { Table } from 'Api/table'
import { FormItemContainer, FormItemInput, FormItemLabel, FormItemHeader } from 'Component/Form/FormElement'
import { useAccessToken } from 'Api/tokenCookie'

const EditRestaurantPage: React.FC = () => {
  const { id } = useParams()
  if (id === undefined) throw new Error('id가 없습니다.')

  const navigate = useNavigate()

  const [restaurantImageList, setRestaurantImageList] = useState<Image[]>([])
  const { register, handleSubmit, reset, setValue, getValues } = useForm()

  const [accesstoken] = useAccessToken()

  // Create a query function for fetching restaurant data
  const fetchRestaurantData = async () => {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/restaurants/${id}`)
    return response.data
  }

  const fetchTableData = async () => {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/tables/restaurants/${id}/`, {
      headers: {
        Authorization: `Bearer ${accesstoken}`,
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
  }: UseQueryResult<Restaurant> = useQuery('restaurant', fetchRestaurantData)

  const { data: tableData, refetch: refetchTableData }: UseQueryResult<Table[]> = useQuery('table', fetchTableData)

  const unshiftImage = (image: Image) => {
    updateRestaurantImageList([image, ...restaurantImageList])
  }

  const addTable = async () => {
    let len = 0
    if (tableData !== undefined) len = tableData.length

    axios
      .post(
        `${process.env.REACT_APP_API_URL}/tables`,
        {
          restaurant_id: id,
          name: `${len + 1} 번째 테이블`,
        },
        {
          headers: {
            Authorization: `Bearer ${accesstoken}`,
          },
        },
      )
      .then(() => {
        refetchTableData()
      })
      .catch((error) => {
        // console.log(error)
      })
  }

  const deleteTable = async (table_id: string) => {
    axios
      .delete(`${process.env.REACT_APP_API_URL}/tables/${table_id}`, {
        headers: {
          Authorization: `Bearer ${accesstoken}`,
        },
      })
      .then(() => {
        refetchTableData()
      })
      .catch((error) => {
        // console.log(error)
      })
  }

  const handleChange = (file: any) => {
    const formData = new FormData()

    for (let i = 0; i < file.target.files.length; i++) {
      formData.append('image', file.target.files[i])
    }

    axios
      .patch(`${process.env.REACT_APP_API_URL}/restaurants/${id}/images`, formData, {
        headers: {
          Authorization: `Bearer ${accesstoken}`,
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        for (let i = 0; i < response.data.length; i++) {
          unshiftImage(response.data[i])
        }
        const prev = getValues('banner_images') ?? []

        setValue('banner_images', [...prev, response.data])
      })
      .catch((error) => {
        // console.log(error)
      })
  }

  const deleteImage = (i: number) => {
    axios
      .delete(`${process.env.REACT_APP_API_URL}/restaurants/${id}/images/${restaurantImageList[i].filename}`, {
        headers: {
          Authorization: `Bearer ${accesstoken}`,
        },
      })
      .then((response) => {
        const prev = getValues('banner_images') ?? []
        if (i >= 0 && i < restaurantImageList.length) {
          setRestaurantImageList(restaurantImageList.filter((_, index) => i !== index))
        }
        if (i >= 0 && i < prev.length) {
          setValue(
            'banner_images',
            prev.filter((_: any, index: any) => i !== index),
          )
        }
      })
      .catch((error) => {
        console.error(error)
      })
  }

  const onRetaurantEditSubmit = (data: any) => {
    axios
      .patch(`${process.env.REACT_APP_API_URL}/restaurants/${id}`, data, {
        headers: {
          Authorization: `Bearer ${accesstoken}`,
        },
      })
      .then((response) => {
        alert('매장 정보 수정되었습니다.')
        navigate(-1)
      })
      .catch((error) => {
        alert('매장 정보 수정에 실패했습니다')
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

  useEffect(() => {
    if (restaurant !== undefined) {
      reset({
        name: restaurant.name,
        intro: restaurant.intro,
        phone_number: restaurant.phone_number,
        address: restaurant.address,
      })

      updateRestaurantImageList(
        restaurant.banner_images.map((image) => {
          image.path = `${image.path}`
          return image
        }),
      )
    }
  }, [restaurant])

  if (isLoading) {
    return <Loading />
  }
  if (isError) return <ErrorPage errorCode={500} />

  return (
    <div>
      <Header
        HeaderName={'가게 관리'}
        Left={<ChevronLeft20Regular style={{ cursor: 'pointer' }} onClick={() => navigate(-1)} />}
        Right={
          <CompleteButton type="submit" form="form">
            완료
          </CompleteButton>
        }
      ></Header>
      <Container>
        <form id="form" onSubmit={handleSubmit(onRetaurantEditSubmit)}>
          <FormItemContainer>
            <FormItemHeader>
              <FormItemLabel>가게 이름</FormItemLabel>
            </FormItemHeader>
            <FormItemInput type="text" {...register('name')} />
          </FormItemContainer>
          <FormItemContainer>
            <FormItemHeader>
              <FormItemLabel>가게 사진</FormItemLabel>
            </FormItemHeader>
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

                        <ImageContainer src={process.env.REACT_APP_STATIC_URL + image.path} />
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
            <FormItemHeader>
              <FormItemLabel>가게 설명</FormItemLabel>
            </FormItemHeader>
            <FormItemInput type="text" {...register('intro')} />
          </FormItemContainer>
          <FormItemContainer>
            <FormItemHeader>
              <FormItemLabel>연락처</FormItemLabel>
            </FormItemHeader>
            <FormItemInput type="text" {...register('phone_number')} />
          </FormItemContainer>
          <FormItemContainer>
            <FormItemHeader>
              <FormItemLabel>주소</FormItemLabel>
            </FormItemHeader>
            <FormItemInput type="text" {...register('address')} />
          </FormItemContainer>
          <input type="hidden" {...register('banner_images')} />
        </form>
        <FormHeader>
          <FormItemHeader>
            <FormItemLabel>테이블</FormItemLabel>
            <div style={{ color: '#999999' }}>{tableData?.length}개</div>
          </FormItemHeader>
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
  font-size: ${({ theme }) => theme.FONT_SIZE.medium};
  cursor: pointer;
`
const Container = styled.div`
  width: 80%;
  margin: auto;
`
