import Header from 'Component/Header'
import ContainerBox from 'Component/MenuComponent/ContainerBox'
import { Restaurant } from 'Context/restaurantContext'
import { Button, Card, Form, Input, Upload, UploadFile, message } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useMutation } from 'react-query'
import axios from 'axios'
import { StyledSpin } from './MenuBoardPage'
import ErrorPage from './ErrorPage'
import { useQueryClient, useQuery, UseQueryResult } from 'react-query'

const EditRestaurantPage: React.FC = () => {
  const { id } = useParams()
  if (id === undefined) throw new Error('id가 없습니다.')

  const queryClient = useQueryClient()

  // Create a query function for fetching restaurant data
  const fetchRestaurantData = async () => {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/restaurants/${id}`, {
      auth: {
        username: process.env.REAT_APP_BASIC_AUTH_USERNAME ? process.env.REAT_APP_BASIC_AUTH_USERNAME : 'myusername',
        password: process.env.REAT_APP_BASIC_AUTH_PASSWORD ? process.env.REAT_APP_BASIC_AUTH_PASSWORD : 'password123',
      },
    })
    return response.data
  }

  // Use the query function to fetch the restaurant data
  const {
    data: restaurant,
    isLoading,
    isError,
    isFetching,
  }: UseQueryResult<Restaurant> = useQuery(['restaurant', id], fetchRestaurantData)

  const [isSubmitButtonDisabled, setSubmitButtonDisabled] = useState(false)

  const [restaurantImageList, setRestaurantImageList] = useState<UploadFile[]>([])
  const [menuImageList, setMenuImageList] = useState<UploadFile[][]>([])

  const handleChange = ({ fileList: newFileList }: { fileList: UploadFile[] }) => {
    newFileList.forEach((file) => {
      if (file.type === 'image/png' || file.type === 'image/jpeg' || file.type === 'image/jpg') {
        return {
          name: file.name,
          status: file.status,
          url: file.url,
          type: file.type,
        }
      }
      throw new Error('이미지 파일만 업로드 가능합니다.')
    })
    setRestaurantImageList(newFileList)
  }

  const mutation = useMutation(
    (formData: FormData) => {
      return axios.patch(`${process.env.REACT_APP_API_URL}/restaurants/${id}`, formData, {
        auth: {
          username: process.env.REAT_APP_BASIC_AUTH_USERNAME ? process.env.REAT_APP_BASIC_AUTH_USERNAME : 'myusername',
          password: process.env.REAT_APP_BASIC_AUTH_PASSWORD ? process.env.REAT_APP_BASIC_AUTH_PASSWORD : 'password123',
        },
      })
    },
    {
      onSuccess: async (data) => {
        // Update the query data with the updated restaurant data
        queryClient.setQueryData(['restaurant', id], data)

        // Trigger a manual query refetch to ensure the updated data is fetched
        await queryClient.refetchQueries(['restaurant', id])
        // Show a success message
        message.success('매장 정보가 업데이트되었습니다.')
      },
      onError: () => {
        // Show an error message
        message.error('매장 정보 업데이트에 실패하였습니다. 새로고침 후 진행해주세요.')
      },
    },
  )

  const handleSubmit = async (updatedRestaurant: Restaurant) => {
    try {
      setSubmitButtonDisabled(true)

      if (updatedRestaurant && updatedRestaurant.category == undefined) {
        updatedRestaurant.category = []
      }

      if (restaurant && restaurant.banner_images) {
        updatedRestaurant.banner_images = restaurant.banner_images.filter((banner_image) => {
          return restaurantImageList?.find((file) => {
            return file.name === banner_image.filename
          })
        })
      }
      const formData = new FormData()
      formData.append('updateRestaurantsDto', JSON.stringify(updatedRestaurant))

      if (restaurantImageList?.length) {
        restaurantImageList.forEach((file) => {
          formData.append('image', file.originFileObj as Blob)
        })
      }

      if (menuImageList && menuImageList.length) {
        menuImageList.forEach((menuImage) => {
          menuImage.forEach((file) => {
            if (file.originFileObj instanceof Blob) {
              formData.append('menuImage', file.originFileObj)
            } else {
              // 이미지 순서를 보장하기 위해 수정되지 않은 이미지들은 빈 Blob으로 보내서 서버에서 거르도록 'application/octet-stream' 타입으로 빈 Blob 생성
              const emptyBlob = new Blob([], { type: 'application/octet-stream' })
              formData.append('menuImage', emptyBlob)
            }
          })
        })
      }

      await mutation.mutateAsync(formData)

      setSubmitButtonDisabled(false)
    } catch (e) {
      console.error(e)
      setSubmitButtonDisabled(false)
    }
  }

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  )
  const formItemLayout = {
    labelCol: {
      span: 6,
    },
    wrapperCol: {
      span: 14,
    },
  }

  useEffect(() => {
    // 초기 이미지 세팅
    if (restaurant && restaurant.banner_images) {
      const newFileList = restaurant.banner_images.map((banner_image) => {
        return {
          name: banner_image.filename,
          status: 'done',
          url: process.env.REACT_APP_STATIC_URL + banner_image.path,
          type: banner_image.type,
        } as UploadFile
      })
      setRestaurantImageList(newFileList)
    }

    if (restaurant && restaurant.menus) {
      for (let i = 0; i < restaurant.menus.length; i++) {
        const newFileList = [
          restaurant.menus[i].img
            ? [
                {
                  name: restaurant.menus[i].img.filename,
                  status: 'done',
                  url: process.env.REACT_APP_STATIC_URL + restaurant.menus[i].img.path,
                  type: restaurant.menus[i].img.type,
                } as UploadFile,
              ]
            : [],
        ]

        setMenuImageList((prev) => [...prev, ...newFileList])
      }
    }
  }, [restaurant])

  if (isLoading) {
    return (
      <StyledSpin tip="Loading" size="large">
        <div className="content" />
      </StyledSpin>
    )
  }
  if (isError) return <ErrorPage errorCode={500} />

  return (
    <div>
      <Header HeaderName={restaurant?.name + ' 관리'}></Header>
      <ContainerBox>
        <Form
          name="restaurant"
          {...formItemLayout}
          initialValues={{
            ...restaurant,
          }}
          style={{
            maxWidth: 1200,
          }}
          onFinish={handleSubmit}
        >
          <Form.Item
            name="name"
            label="매장 이름"
            rules={[
              {
                required: true,
                message: '매장 이름을 입력해주세요.',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="en_name"
            label="매장 영어 이름"
            rules={[
              {
                required: true,
                message: '매장 영어 이름을 입력해주세요.',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="address"
            label="매장 주소"
            rules={[
              {
                required: true,
                message: '매장 주소를 입력해주세요.',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="phone_number" label="매장 전화번호">
            <Input />
          </Form.Item>
          <Form.List name="category">
            {(fields, { add, remove }) => (
              <>
                {fields.map((field, index) => (
                  <>
                    <Form.Item label={`카테고리 ${index + 1}`} name={field.name}>
                      <Input />
                    </Form.Item>
                    <Button onClick={() => remove(field.name)}>카태고리 삭제</Button>
                  </>
                ))}
                <Button onClick={() => add()}>카테고리 추가</Button>
              </>
            )}
          </Form.List>
          <Form.List name="menus">
            {(fields, { add, remove }) => (
              <div style={{ display: 'flex', overflowX: 'auto' }}>
                {fields.map((field, index) => (
                  <Card title={`메뉴 ${index + 1}`} key={field.key} style={{ minWidth: 500, marginRight: 16 }}>
                    <Form.Item
                      label="메뉴 이름"
                      name={[field.name, 'name']}
                      rules={[{ required: true, message: '메뉴 이름을 입력해주세요.' }]}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item label="메뉴 영어 이름" name={[field.name, 'en_name']}>
                      <Input />
                    </Form.Item>
                    <Form.Item
                      label="메뉴 가격"
                      name={[field.name, 'price']}
                      rules={[{ required: true, message: '메뉴 가격을 입력해주세요.' }]}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item label="메뉴 메뉴 타입" name={[field.name, 'menutype']}>
                      <Input />
                    </Form.Item>
                    <Form.Item label="메뉴 카테고리" name={[field.name, 'category']}>
                      <Input />
                    </Form.Item>
                    <Form.Item label="메뉴 설명" name={[field.name, 'description']}>
                      <Input />
                    </Form.Item>
                    <Upload
                      listType="picture-card"
                      accept="image/png, image/jpeg, image/jpg"
                      fileList={menuImageList[index]}
                      multiple={true}
                      onChange={({ fileList: newFileList }: { fileList: UploadFile[] }) => {
                        newFileList.forEach((file) => {
                          if (file.type === 'image/png' || file.type === 'image/jpeg' || file.type === 'image/jpg') {
                            return {
                              name: file.name,
                              status: file.status,
                              url: file.url,
                              type: file.type,
                            }
                          }
                          throw new Error('이미지 파일만 업로드 가능합니다.')
                        })
                        setMenuImageList((prev) => {
                          const newMenuImageList = [...prev]
                          newMenuImageList[index] = newFileList
                          return newMenuImageList
                        })
                      }}
                      showUploadList={{
                        showPreviewIcon: false,
                        showRemoveIcon: true,
                        showDownloadIcon: false,
                      }}
                    >
                      {menuImageList[index] && menuImageList[index].length >= 1 ? null : uploadButton}
                    </Upload>
                    <Form.List name={[field.name, 'ingre']}>
                      {(fields, { add, remove }) => (
                        <>
                          {fields.map((field, index) => (
                            <>
                              <Form.Item label={`재료 ${index + 1}`} name={field.name}>
                                <Input />
                              </Form.Item>
                              <Button onClick={() => remove(field.name)}>재료 삭제</Button>
                            </>
                          ))}
                          <Button onClick={() => add()}>재료 추가</Button>
                        </>
                      )}
                    </Form.List>
                    <Button
                      onClick={() => {
                        // 메뉴 이미지도 같이 삭제하기 위해
                        remove(field.name)
                        setMenuImageList((prev) => {
                          const newMenuImageList = [...prev]
                          newMenuImageList.splice(index, 1)
                          return newMenuImageList
                        })
                      }}
                    >
                      메뉴 삭제
                    </Button>
                  </Card>
                ))}
                <Button onClick={() => add()} style={{ border: 'dashed 1px', minWidth: 500, margin: '0 16px' }}>
                  메뉴 추가
                </Button>
              </div>
            )}
          </Form.List>

          <Upload
            listType="picture-card"
            fileList={restaurantImageList}
            onChange={handleChange}
            accept="image/png, image/jpeg, image/jpg"
            showUploadList={{
              showPreviewIcon: false,
              showRemoveIcon: true,
              showDownloadIcon: false,
            }}
          >
            {restaurantImageList && restaurantImageList.length >= 6 ? null : uploadButton}
          </Upload>
          <Form.Item wrapperCol={{ offset: 6, span: 14 }}>
            <Button type="primary" htmlType="submit" disabled={isSubmitButtonDisabled || isFetching}>
              {/* Use isFetching to determine button text */}
              {isFetching ? '업데이트 중...' : '수정하기'}
            </Button>
          </Form.Item>
        </Form>
      </ContainerBox>
    </div>
  )
}
export default EditRestaurantPage
