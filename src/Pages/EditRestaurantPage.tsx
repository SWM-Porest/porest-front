import Header from 'Component/Header'
import { Restaurant } from 'Context/restaurantContext'
import { Button, Card, Form, Input, InputNumber, Modal, Switch, Upload, UploadFile, message } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import {
  AddCircle24Filled,
  ReOrder24Regular,
  SubtractCircle24Filled,
  DismissCircle24Filled,
} from '@fluentui/react-icons'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useMutation } from 'react-query'
import axios from 'axios'
import ErrorPage from './ErrorPage'
import { useQueryClient, useQuery, UseQueryResult } from 'react-query'
import { styled } from 'styled-components'
import Footer from 'Component/Footer'
import Loading from 'Component/Loading'

const EditRestaurantPage: React.FC = () => {
  const { id } = useParams()
  if (id === undefined) throw new Error('id가 없습니다.')

  const [form] = Form.useForm()

  const [menuOptionForm] = Form.useForm()

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
    isFetching,
  }: UseQueryResult<Restaurant> = useQuery(['restaurant', id], fetchRestaurantData)

  const [selectedIndex, setSelectedIndex] = useState({ menu: 0, option: 0 })

  const [confirmLoading, setConfirmLoading] = useState(false)

  const [selectedLanguage, setSelectedLanguage] = useState('ko')

  const [maxOptionsSelect, setMaxOptionsSelect] = useState(1)

  const [isMenuOptionModalOpen, setIsMenuOptionModalOpen] = useState(false)

  const [restaurantImageList, setRestaurantImageList] = useState<UploadFile[]>([])
  const [menuImageList, setMenuImageList] = useState<UploadFile[][]>([])
  const [showDetails, setShowDetails] = useState<boolean[]>([])

  const handleChange2 = (file: any) => {
    console.log(file.target)
    const fileList = [...restaurantImageList]
    for (let i = 0; i < file.target.files.length; i++) {
      fileList.unshift({
        name: file.target.files[i].name,
        status: file.target.files[i].status,
        url: URL.createObjectURL(file.target.files[i]),
        type: file.target.files[i].type,
        uid: '',
      })
    }

    setRestaurantImageList(fileList)
  }

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

  const deleteImage = (i: number) => {
    if (i >= 0 && i < restaurantImageList.length) {
      setRestaurantImageList(restaurantImageList.filter((_, index) => i !== index))
    }
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
        message.error('매뉴 정보 업데이트에 실패하였습니다. 새로고침 후 진행해주세요.')
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

  const formItemLayoutWithOutLabel = {
    wrapperCol: {
      xs: { span: 24, offset: 0 },
      sm: { span: 20, offset: 0 },
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
    return <Loading />
  }
  if (isError) return <ErrorPage errorCode={500} />

  return (
    <div>
      <Header HeaderName={'가게 관리'} Right={<CompleteButton>완료</CompleteButton>}></Header>
      <Container>
        <form>
          <FormItemContainer>
            <FormItemLabel>가게 이름</FormItemLabel>
            <FormItemInput type="text" />
          </FormItemContainer>
          <FormItemContainer>
            <FormItemLabel>가게 사진</FormItemLabel>
            <ImageListContainer>
              <input
                type="file"
                id="restaurantImage"
                accept="image/*"
                style={{ visibility: 'hidden' }}
                onChange={handleChange2}
                multiple
              />
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

                        <ImageContainer src={image.url} />
                      </ImageItem>
                    )
                  })
                : null}
            </ImageListContainer>
          </FormItemContainer>
          <FormItemContainer>
            <FormItemLabel>가게 설명</FormItemLabel>
            <FormItemInput type="text" />
          </FormItemContainer>
          <FormItemContainer>
            <FormItemLabel>연락처</FormItemLabel>
            <FormItemInput type="text" />
          </FormItemContainer>
          <FormItemContainer>
            <FormItemLabel>주소</FormItemLabel>
            <FormItemInput type="text" />
          </FormItemContainer>
        </form>
        {/* <Form
          form={form}
          name="restaurant"
          initialValues={{
            ...restaurant,
          }}
          onFinish={handleSubmit}
          layout="vertical"
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
          <Form.Item label="가게 사진">
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
          </Form.Item> */}
        {/* <Form.List name="category">
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
                  type={'link'}
                  onClick={() => add()}
                  style={{ height: 'fit-content', marginBottom: '8pt' }}
                  block
                >
                  <PlusOutlined />
                  카테고리 추가
                </Button>
              </>
            )}
          </Form.List>
          <Form.List name="menus">
            {(fields, { add, remove }) => (
              <CardContainer>
                {fields.map((field, menuIndex) => (
                  <div key={field.key}>
                    <Card
                      title={`메뉴 ${menuIndex + 1}`}
                      style={{ minWidth: 500, marginBottom: '8pt' }}
                      extra={
                        <Button
                          style={{ height: 'fit-content' }}
                          icon={<EyeOutlined />}
                          onClick={() => setShowDetails((prev) => ({ ...prev, [menuIndex]: !prev[menuIndex] }))}
                        >
                          {showDetails[menuIndex] ? '간략히 보기' : '자세히 보기'}
                        </Button>
                      }
                    >
                      <StyledUpload
                        listType="picture-card"
                        accept="image/png, image/jpeg, image/jpg"
                        fileList={menuImageList[menuIndex]}
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
                            newMenuImageList[menuIndex] = newFileList
                            return newMenuImageList
                          })
                        }}
                        showUploadList={{
                          showPreviewIcon: false,
                          showRemoveIcon: true,
                          showDownloadIcon: false,
                        }}
                      >
                        {menuImageList[menuIndex] && menuImageList[menuIndex].length >= 1 ? null : uploadButton}
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

                      {showDetails[menuIndex] && (
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
                                {fields.map((field, igreIndex) => (
                                  <div key={field.key} style={{ display: 'flex' }}>
                                    <Form.Item
                                      label={`재료 ${igreIndex + 1}`}
                                      name={field.name}
                                      style={{ marginRight: '8pt' }}
                                      rules={[{ required: true, message: '재료를 입력해주세요.' }]}
                                    >
                                      <Input />
                                    </Form.Item>
                                    <Button onClick={() => remove(field.name)} style={{ height: 'fit-content' }} danger>
                                      재료 삭제
                                    </Button>
                                  </div>
                                ))}
                                <Button
                                  type={'link'}
                                  onClick={() => add()}
                                  style={{ height: 'fit-content', marginBottom: '8pt' }}
                                  block
                                >
                                  <PlusOutlined />
                                  재료 추가
                                </Button>
                              </>
                            )}
                          </Form.List>
                          <Form.List name={[field.name, 'menuOptions']}>
                            {(fields, { add, remove }) => (
                              <>
                                {fields.map((field, menuOptionIndex) => (
                                  <div key={field.key}>
                                    <Card
                                      title={
                                        isFetching
                                          ? ''
                                          : restaurant?.menus[menuIndex]?.menuOptions[menuOptionIndex]?.name?.language[
                                              selectedLanguage
                                            ] ?? ''
                                      }
                                      style={{ marginBottom: '8pt' }}
                                      actions={[
                                        <Button
                                          onClick={() => remove(field.name)}
                                          style={{ height: 'fit-content', marginBottom: '8pt' }}
                                          danger
                                        >
                                          옵션 삭제
                                        </Button>,
                                      ]}
                                    >
                                      <Form.Item label={`옵션 ${menuOptionIndex + 1}`} colon={false}></Form.Item>
                                      <Form.List name={[field.name, 'items']}>
                                        {(fields, { add, remove }) => (
                                          <>
                                            {fields.map((field, itemIndex) => (
                                              <div key={field.key} style={{ display: 'flex' }}>
                                                <Form.Item
                                                  label={`옵션 항목 이름`}
                                                  name={[field.name, 'name', 'language', 'ko']}
                                                  style={{ marginRight: '8pt' }}
                                                >
                                                  <Input disabled={true} />
                                                </Form.Item>
                                                <Form.Item
                                                  label={`옵션 항목 가격 ${itemIndex + 1}`}
                                                  name={[field.name, 'price']}
                                                  style={{ marginRight: '8pt' }}
                                                >
                                                  <Input disabled={true} />
                                                </Form.Item>
                                              </div>
                                            ))}
                                          </>
                                        )}
                                      </Form.List>
                                      <Form.Item
                                        label="필수 여부"
                                        name={[field.name, 'isRequired']}
                                        valuePropName="checked"
                                      >
                                        <Switch disabled={true} />
                                      </Form.Item>
                                      <Form.Item
                                        label="품절 여부"
                                        name={[field.name, 'isSoldOut']}
                                        valuePropName="checked"
                                      >
                                        <Switch />
                                      </Form.Item>
                                      <Form.Item label="최대 선택 수량" name={[field.name, 'maxSelect']}>
                                        <InputNumber min={1} max={maxOptionsSelect} disabled={true} />
                                      </Form.Item>
                                    </Card>
                                  </div>
                                ))}
                                <Button
                                  type={'primary'}
                                  onClick={() => {
                                    setIsMenuOptionModalOpen(true)
                                    setSelectedIndex({
                                      menu: menuIndex,
                                      option: restaurant?.menus[menuIndex]?.menuOptions?.length ?? 0,
                                    })
                                  }}
                                  style={{ height: 'fit-content', marginBottom: '8pt' }}
                                  block
                                >
                                  옵션 추가
                                </Button>
                              </>
                            )}
                          </Form.List>
                        </>
                      )}
                      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Button
                          style={{ height: 'fit-content', marginRight: '8pt' }}
                          loading={confirmLoading}
                          onClick={async () => {
                            try {
                              setConfirmLoading(true)

                              if (restaurant?.menus[menuIndex] && restaurant?.menus[menuIndex]._id) {
                                const menuId = restaurant?.menus[menuIndex]._id
                                await deleteMenuMutation.mutateAsync(menuId)
                              }
                              remove(field.name)
                              setMenuImageList((prev) => {
                                const newMenuImageList = [...prev]
                                newMenuImageList.splice(menuIndex, 1)
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
                          onClick={() => updateMenu(menuIndex)}
                          loading={confirmLoading}
                          style={{ height: 'fit-content' }}
                        >
                          {isFetching || restaurant?.menus[menuIndex]?._id ? '메뉴 수정' : '메뉴 등록'}
                        </Button>
                      </div>
                    </Card>
                  </div>
                ))}
                <ButtonContainer>
                  <Button
                    type="link"
                    onClick={() => add()}
                    style={{ marginBottom: '8pt', height: 'fit-content' }}
                    block
                  >
                    <PlusOutlined />
                    메뉴 추가
                  </Button>
                </ButtonContainer>
              </CardContainer>
            )}
          </Form.List> */}
        {/* <Button
            type="primary"
            htmlType="submit"
            loading={confirmLoading}
            style={{ height: 'fit-content', marginBottom: '8pt' }}
            block
          >
            수정하기
          </Button> */}
        {/* </Form> */}

        {/* <Modal
          title="메뉴 옵션 추가"
          open={isMenuOptionModalOpen}
          onCancel={() => {
            setIsMenuOptionModalOpen(false)
            menuOptionForm.resetFields()
            setMaxOptionsSelect(1)
          }}
          width={1000}
          okText="추가하기"
          cancelText="취소"
          confirmLoading={confirmLoading}
          onOk={() => {
            setConfirmLoading(true)
            menuOptionForm
              .validateFields()
              .then((values) => {
                // 이름 언어별로 저장
                values.name = {
                  language: {
                    ko: values.name,
                  },
                }
                values.items.forEach((item: any) => {
                  item.name = {
                    language: {
                      ko: item.name,
                    },
                  }
                })

                if (restaurant && restaurant.menus[selectedIndex.menu].menuOptions === undefined) {
                  restaurant.menus[selectedIndex.menu].menuOptions = []
                }

                if (restaurant) {
                  restaurant?.menus[selectedIndex.menu].menuOptions.push(values)

                  form.setFieldValue('menus', restaurant.menus)
                }

                setIsMenuOptionModalOpen(false)
                menuOptionForm.resetFields()
              })
              .catch((error) => {
                console.log(error)
              })
            setConfirmLoading(false)
          }}
        >
          <Form form={menuOptionForm} layout="vertical">
            <Form.Item label="옵션 이름" name="name" rules={[{ required: true, message: '옵션 이름을 입력해주세요!' }]}>
              <Input />
            </Form.Item>
            <Form.List name="items">
              {(fields, { add, remove }) => (
                <>
                  <div style={{ marginBottom: '8pt' }}>옵션 항목</div>
                  {fields.map((field, index) => (
                    <div key={field.key}>
                      <Form.Item {...formItemLayoutWithOutLabel}>
                        <Form.Item
                          name={[field.name, 'name']}
                          validateTrigger={['onChange', 'onBlur']}
                          rules={[
                            {
                              required: true,
                              whitespace: true,
                              message: '항목 이름을 입력해주세요!',
                            },
                          ]}
                          noStyle
                        >
                          <Input placeholder="항목 이름" style={{ width: '40%' }} />
                        </Form.Item>
                        <Form.Item
                          name={[field.name, 'price']}
                          validateTrigger={['onChange', 'onBlur']}
                          rules={[
                            {
                              required: true,
                              whitespace: true,
                              message: '항목 가격을 입력해주세요!',
                            },
                          ]}
                          noStyle
                        >
                          <Input placeholder="항목 가격" style={{ width: '40%' }} suffix="원" />
                        </Form.Item>
                        {fields.length > 1 ? (
                          <Button
                            type="default"
                            style={{ height: 'fit-content' }}
                            onClick={() => {
                              remove(field.name)
                              if (maxOptionsSelect > 1) setMaxOptionsSelect(maxOptionsSelect - 1)
                            }}
                          >
                            삭제
                          </Button>
                        ) : null}
                      </Form.Item>
                    </div>
                  ))}
                  <Button
                    type="link"
                    onClick={() => {
                      add()
                      setMaxOptionsSelect(menuOptionForm.getFieldValue('items').length)
                    }}
                  >
                    <PlusOutlined /> 옵션 항목 추가하기
                  </Button>
                </>
              )}
            </Form.List>
            <Form.Item label="필수 여부" name="isRequired" valuePropName="checked">
              <Switch />
            </Form.Item>
            <Form.Item label="주문할 때 최대 몇개를 선택할까요?" name="maxSelect" initialValue={1}>
              <InputNumber min={1} max={maxOptionsSelect} />
            </Form.Item>
          </Form>
        </Modal> */}
        <FormHeader>
          <div>테이블</div>
          <div style={{ color: '#999999' }}>5개</div>
        </FormHeader>
        <FormBody>
          <FormContent>
            <div style={{ flex: 1 }}>
              <SubtractCircle24Filled color="red" />
            </div>
            <div style={{ flex: 6 }}>1 번 테이블</div>
            <div style={{ flex: 1 }}>
              <ReOrder24Regular color="#AAAAAA" />
            </div>
          </FormContent>
          <TableAddButton>
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
const FormItemLabel = styled.div`
  margin-bottom: 4pt;
`
const FormItemInput = styled.input`
  width: 100%;
  border: 1px solid #f7f7f7;
  border-radius: 12%;
  padding: 8pt;
`
const FormItemContainer = styled.div`
  margin-bottom: 24pt;
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

const CompleteButton = styled.div`
  font-weight: bold;
  color: #3fba73;
  font-size: ${({ theme }) => theme.FONT_SIZE.tiny};
  cursor: pointer;
`
const Container = styled.div`
  width: 80%;
  margin: auto;
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
