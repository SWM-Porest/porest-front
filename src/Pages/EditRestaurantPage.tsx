import Header from 'Component/Header'
import ContainerBox from 'Component/MenuComponent/ContainerBox'
import { Restaurant, getRestaurant, useRestauranDispatch, useRestaurantState } from 'Context/restaurantContext'
import { Button, Form, Input, Upload, UploadFile } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const EditRestaurantPage: React.FC = () => {
  const { id } = useParams()
  if (id === undefined) throw new Error('id가 없습니다.')

  const dispatch = useRestauranDispatch()
  const { data: restaurant, loading, error } = useRestaurantState().restaurant

  const [restaurantImageList, setRestaurantImageList] = useState<UploadFile[]>([])

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

  const handleSubmit = async (restaurant: Restaurant) => {
    try {
      console.log(restaurant)
      if (restaurant && restaurant.category == undefined) {
        restaurant.category = []
      }
      const formData = new FormData()
      formData.append('updateRestaurantsDto', JSON.stringify(restaurant))

      if (restaurantImageList?.length) {
        restaurantImageList.forEach((file) => {
          formData.append('image', file.originFileObj as Blob)
        })
      }

      await axios.patch(`${process.env.REACT_APP_API_URL}/restaurants/${id}`, formData, {
        auth: {
          username: 'myusername',
          password: 'password123',
        },
      })
    } catch (e) {
      console.error(e)
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
    getRestaurant(dispatch, id)
  }, [dispatch, id])

  useEffect(() => {
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
  }, [restaurant])

  if (loading) return <div>로딩중...</div>
  if (error) return <div>에러가 발생했습니다.</div>

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
            maxWidth: 600,
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
                {fields.map((field) => (
                  <>
                    <Form.Item label="카테고리" name={field.name} key={field.key}>
                      <Input />
                    </Form.Item>
                    <Button onClick={() => remove(field.name)}>삭제</Button>
                  </>
                ))}
                <Button onClick={() => add()}>카테고리 추가</Button>
              </>
            )}
          </Form.List>
          <Form.List name="menus">
            {(fields, { add, remove }) => (
              <>
                {fields.map((field) => (
                  <>
                    <Form.Item label="메뉴 이름" name={[field.name, 'name']} key={field.key}>
                      <Input />
                    </Form.Item>
                    <Form.Item label="메뉴 영어 이름" name={[field.name, 'en_name']} key={field.key}>
                      <Input />
                    </Form.Item>
                    <Form.Item label="메뉴 가격" name={[field.name, 'price']} key={field.key}>
                      <Input />
                    </Form.Item>
                    <Form.Item label="메뉴 메뉴 타입" name={[field.name, 'menu_type']} key={field.key}>
                      <Input />
                    </Form.Item>
                    <Form.Item label="메뉴 카테고리" name={[field.name, 'category']} key={field.key}>
                      <Input />
                    </Form.Item>
                    <Form.Item label="메뉴 설명" name={[field.name, 'description']} key={field.key}>
                      <Input />
                    </Form.Item>
                    <Form.Item label="메뉴 이미지" name={[field.name, 'img']} key={field.key}>
                      <Input />
                    </Form.Item>
                    <Form.List name={[field.name, 'ingre']} key={field.key}>
                      {(fields, { add, remove }) => (
                        <>
                          {fields.map((field) => (
                            <>
                              <Form.Item label="재료" name={field.name} key={field.key}>
                                <Input />
                              </Form.Item>
                              <Button onClick={() => remove(field.name)}>삭제</Button>
                            </>
                          ))}
                          <Button onClick={() => add()}>재료 추가</Button>
                        </>
                      )}
                    </Form.List>
                    <Button onClick={() => remove(field.name)}>삭제</Button>
                  </>
                ))}
                <Button onClick={() => add()}>메뉴 추가</Button>
              </>
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
            <Button type="primary" htmlType="submit">
              수정하기
            </Button>
          </Form.Item>
        </Form>
      </ContainerBox>
    </div>
  )
}
export default EditRestaurantPage
