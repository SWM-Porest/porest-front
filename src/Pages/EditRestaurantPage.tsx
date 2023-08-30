import Header from 'Component/Header'
import { Restaurant } from 'Context/restaurantContext'
import { Button, Card, Form, Input, Upload, UploadFile, message } from 'antd'
import { PlusOutlined, EyeOutlined } from '@ant-design/icons'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useMutation } from 'react-query'
import axios from 'axios'
import { StyledSpin } from './MenuBoardPage'
import ErrorPage from './ErrorPage'
import { useQueryClient, useQuery, UseQueryResult } from 'react-query'
import { styled } from 'styled-components'
import Footer from 'Component/Footer'

const EditRestaurantPage: React.FC = () => {
  const { id } = useParams()
  if (id === undefined) throw new Error('id가 없습니다.')

  const [form] = Form.useForm()

  const queryClient = useQueryClient()

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

  // Use the query function to fetch the restaurant data
  const {
    data: restaurant,
    isLoading,
    isError,
  }: UseQueryResult<Restaurant> = useQuery(['restaurant', id], fetchRestaurantData)

  const [confirmLoading, setConfirmLoading] = useState(false)

  const [restaurantImageList, setRestaurantImageList] = useState<UploadFile[]>([])
  const [menuImageList, setMenuImageList] = useState<UploadFile[][]>([])
  const [showDetails, setShowDetails] = useState<boolean[]>([])
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

  const restauratnUpdateMutation = useMutation(
    (formData: FormData) => {
      return axios.patch(`${process.env.REACT_APP_API_URL}/restaurants/${id}`, formData, {
        auth: {
          username: process.env.REACT_APP_BASIC_AUTH_USERNAME
            ? process.env.REACT_APP_BASIC_AUTH_USERNAME
            : 'myusername',
          password: process.env.REACT_APP_BASIC_AUTH_PASSWORD
            ? process.env.REACT_APP_BASIC_AUTH_PASSWORD
            : 'password123',
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
  const menuUpdateMutation = useMutation(
    (formData: FormData) => {
      return axios.patch(`${process.env.REACT_APP_API_URL}/restaurants/${id}/menus`, formData, {
        auth: {
          username: process.env.REACT_APP_BASIC_AUTH_USERNAME
            ? process.env.REACT_APP_BASIC_AUTH_USERNAME
            : 'myusername',
          password: process.env.REACT_APP_BASIC_AUTH_PASSWORD
            ? process.env.REACT_APP_BASIC_AUTH_PASSWORD
            : 'password123',
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
        message.success('메뉴 정보가 업데이트되었습니다.')
      },
      onError: () => {
        // Show an error message
        message.error('매장 정보 업데이트에 실패하였습니다. 새로고침 후 진행해주세요.')
      },
    },
  )
  const deleteMenuMutation = useMutation(
    (menuId: string) => {
      return axios.delete(`${process.env.REACT_APP_API_URL}/restaurants/${id}/menus/${menuId}`, {
        auth: {
          username: process.env.REACT_APP_BASIC_AUTH_USERNAME
            ? process.env.REACT_APP_BASIC_AUTH_USERNAME
            : 'myusername',
          password: process.env.REACT_APP_BASIC_AUTH_PASSWORD
            ? process.env.REACT_APP_BASIC_AUTH_PASSWORD
            : 'password123',
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
        message.success('메뉴가 삭제되었습니다.')
      },
      onError: () => {
        // Show an error message
        message.error('메뉴 삭제에 실패하였습니다. 새로고침 후 진행해주세요.')
      },
    },
  )
  const handleSubmit = async (updatedRestaurant: Restaurant) => {
    try {
      setConfirmLoading(true)

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

      // if (menuImageList && menuImageList.length) {
      //   menuImageList.forEach((menuImage) => {
      //     menuImage.forEach((file) => {
      //       if (file.originFileObj instanceof Blob) {
      //         formData.append('menuImage', file.originFileObj)
      //       } else {
      //         // 이미지 순서를 보장하기 위해 수정되지 않은 이미지들은 빈 Blob으로 보내서 서버에서 거르도록 'application/octet-stream' 타입으로 빈 Blob 생성
      //         const emptyBlob = new Blob([], { type: 'application/octet-stream' })
      //         formData.append('menuImage', emptyBlob)
      //       }
      //     })
      //   })
      // }

      await restauratnUpdateMutation.mutateAsync(formData)

      setConfirmLoading(false)
    } catch (e) {
      console.error(e)
      setConfirmLoading(false)
    }
  }

  const updateMenu = async (index: number) => {
    setConfirmLoading(true)
    try {
      const menu = form.getFieldValue('menus')[index]

      const formData = new FormData()
      if (menuImageList[index] && menuImageList[index].length) {
        menuImageList[index].forEach((file) => {
          if ((file.status === 'done' || file.status === 'error') && file.originFileObj instanceof Blob) {
            formData.append('image', file.originFileObj as Blob)
          } else if ((file.status === 'done' || file.status === 'error') && file.originFileObj === undefined) {
            // 이미지 순서를 보장하기 위해 수정되지 않은 이미지들은 빈 Blob으로 보내서 서버에서 거르도록 'application/octet-stream' 타입으로 빈 Blob 생성
            const emptyBlob = new Blob([], { type: 'application/octet-stream' })
            formData.append('image', emptyBlob)
          } else if (file.status === 'removed') {
            if (menu.img instanceof Array) {
              menu.img.remove(index)
            } else {
              menu.img = ''
            }
          }
        })
      }

      formData.append('updateMenusDto', JSON.stringify(menu))

      await menuUpdateMutation.mutateAsync(formData)

      setConfirmLoading(false)
    } catch (e) {
      console.error(e)
      setConfirmLoading(false)
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
        업로드
      </div>
    </div>
  )

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
      const newFileList = [] as UploadFile[][]
      for (let i = 0; i < restaurant.menus.length; i++) {
        newFileList.push(
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
        )
      }
      setMenuImageList(newFileList)
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
      <Container>
        <StyledUpload
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
        </StyledUpload>
        <Form
          form={form}
          name="restaurant"
          initialValues={{
            ...restaurant,
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
                  <div key={field.key} style={{ display: 'flex' }}>
                    <Form.Item label={`카테고리 ${index + 1}`} name={field.name} style={{ marginRight: '8pt' }}>
                      <Input />
                    </Form.Item>
                    <Button onClick={() => remove(field.name)} style={{ height: 'fit-content' }} danger>
                      카테고리 삭제
                    </Button>
                  </div>
                ))}
                <Button
                  type={'primary'}
                  onClick={() => add()}
                  style={{ height: 'fit-content', marginBottom: '8pt' }}
                  block
                >
                  카테고리 추가
                </Button>
              </>
            )}
          </Form.List>
          <Form.List name="menus">
            {(fields, { add, remove }) => (
              <CardContainer>
                {fields.map((field, index) => (
                  <Card
                    title={`메뉴 ${index + 1}`}
                    style={{ minWidth: 500, marginBottom: '8pt' }}
                    key={field.key}
                    extra={
                      <Button
                        style={{ height: 'fit-content' }}
                        icon={<EyeOutlined />}
                        onClick={() => setShowDetails((prev) => ({ ...prev, [index]: !prev[index] }))}
                      >
                        {showDetails[index] ? '간략히 보기' : '자세히 보기'}
                      </Button>
                    }
                  >
                    <StyledUpload
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
                    </StyledUpload>
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

                    {showDetails[index] && (
                      <>
                        <Form.Item label="메뉴 메뉴 타입" name={[field.name, 'menutype']}>
                          <Input />
                        </Form.Item>
                        <Form.Item label="메뉴 카테고리" name={[field.name, 'category']}>
                          <Input />
                        </Form.Item>
                        <Form.Item label="메뉴 설명" name={[field.name, 'description']}>
                          <Input />
                        </Form.Item>
                        <Form.List name={[field.name, 'ingre']}>
                          {(fields, { add, remove }) => (
                            <>
                              {fields.map((field, index) => (
                                <div key={field.key} style={{ display: 'flex' }}>
                                  <Form.Item
                                    label={`재료 ${index + 1}`}
                                    name={field.name}
                                    style={{ marginRight: '8pt' }}
                                  >
                                    <Input />
                                  </Form.Item>
                                  <Button onClick={() => remove(field.name)} style={{ height: 'fit-content' }} danger>
                                    재료 삭제
                                  </Button>
                                </div>
                              ))}
                              <Button
                                type={'primary'}
                                onClick={() => add()}
                                style={{ height: 'fit-content', marginBottom: '8pt' }}
                                block
                              >
                                재료 추가
                              </Button>
                            </>
                          )}
                        </Form.List>
                        <Button
                          style={{ height: 'fit-content', marginRight: '8pt' }}
                          loading={confirmLoading}
                          onClick={async () => {
                            try {
                              setConfirmLoading(true)

                              if (restaurant?.menus[index] && restaurant?.menus[index]._id) {
                                const menuId = restaurant?.menus[index]._id
                                await deleteMenuMutation.mutateAsync(menuId)
                              }
                              remove(field.name)
                              setMenuImageList((prev) => {
                                const newMenuImageList = [...prev]
                                newMenuImageList.splice(index, 1)
                                return newMenuImageList
                              })

                              setConfirmLoading(false)
                            } catch (e) {
                              console.error(e)
                              message.error('메뉴 삭제에 실패하였습니다. 새로고침 후 진행해주세요.')
                              setConfirmLoading(false)
                            }
                          }}
                          danger
                        >
                          메뉴 삭제
                        </Button>
                        <Button
                          type="primary"
                          onClick={() => updateMenu(index)}
                          loading={confirmLoading}
                          style={{ height: 'fit-content' }}
                        >
                          메뉴 수정
                        </Button>
                      </>
                    )}
                  </Card>
                ))}
                <ButtonContainer>
                  <Button
                    onClick={() => add()}
                    style={{ border: 'dashed 1px', marginBottom: '8pt', height: 'fit-content' }}
                    block
                  >
                    메뉴 추가
                  </Button>
                </ButtonContainer>
              </CardContainer>
            )}
          </Form.List>
          <Button
            type="primary"
            htmlType="submit"
            loading={confirmLoading}
            style={{ height: 'fit-content', marginBottom: '8pt' }}
            block
          >
            수정하기
          </Button>
        </Form>
      </Container>
      <Footer />
    </div>
  )
}
export default EditRestaurantPage

const Container = styled.div`
  width: 80%;
  margin: auto;
  font-size: 24px;
  * {
    font-size: inherit !important; /* 부모 요소의 글꼴 크기 상속 */
  }
`
const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  overflow-x: auto;
`

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`
const StyledUpload = styled(Upload)`
  display: flex;
  overflow-x: auto; /* 가로 스크롤 생성 */
  white-space: nowrap; /* 아이템들이 한 줄에 나열되도록 설정 */
  width: 100%;
  & > * > * {
    width: 200px !important;
    height: 200px !important;
  }
`
