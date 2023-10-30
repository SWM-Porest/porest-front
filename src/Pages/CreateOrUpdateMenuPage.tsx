import {
  Add20Filled,
  AddCircle20Filled,
  AddCircle24Filled,
  CheckmarkCircle20Filled,
  Dismiss20Regular,
  Image20Filled,
  Image24Filled,
  RadioButton20Regular,
  ReOrder20Regular,
  SubtractCircle20Filled,
} from '@fluentui/react-icons'
import { MenuOption } from 'Api/OrderInterface'
import {
  FormInputContainer,
  FormInputInContainer,
  FormItemContainer,
  FormItemInput,
  FormItemLabel,
  FormItemTextField,
  FormItmeHeader,
} from 'Component/Form/FormElement'
import Header from 'Component/Header'
import { Image, isInstanceOfImage } from 'Context/restaurantContext'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { styled } from 'styled-components'
import { v4 as uuidv4 } from 'uuid'
import ErrorPage from './ErrorPage'

const CreateOrUpdateMenuPage = () => {
  const { id } = useParams()

  const { state } = useLocation()

  if (id === undefined || (!state && !state?.category)) {
    return <ErrorPage />
  }

  const navigate = useNavigate()

  const menu = {
    name: '',
    price: 0,
    description: '',
    ingre: [],
    menuOptions: [],
    img: null,
    category: '',
    ...state?.menu,
  }

  if (!!state && !!state.menu) {
    menu.name = state.menu.name
    menu.price = state.menu.price
    menu.description = state.menu.description
    menu.ingre = state.menu.ingre
    menu.menuOptions = state.menu.menuOptions
    menu.img = state.menu.img
    menu.category = state.menu.category
    menu._id = state.menu._id
  }
  const { register, handleSubmit, formState, setValue, getValues, reset } = useForm()

  const [menuImage, setMenuImage] = useState<Image | null>(null)

  const [inputIngreValue, setInputIngreValue] = useState<string>('')

  const [ingreInputValues, setIngreInputValues] = useState<string[]>([])

  const [options, setOptions] = useState<MenuOption[]>([])

  const uploadImage = async (e: any) => {
    const formData = new FormData()
    formData.append('image', e.target.files[0])

    const res = await axios.patch(`${process.env.REACT_APP_API_URL}/restaurants/${id}/menus/images`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })

    if (res.status === 401) {
      alert('로그인이 필요합니다.')
    } else if (res.status !== 200) {
      alert('이미지 업로드에 실패했습니다.')
    } else {
      setMenuImage(res.data)
      reset({ ...menu, img: res.data })
    }
  }

  const submitMenuForm = async (data: any) => {
    if (data._id !== undefined) {
      const res = await axios.patch(`${process.env.REACT_APP_API_URL}/restaurants/${id}/menus/`, data)

      if (res.status === 401) {
        alert('로그인이 필요합니다.')
      } else if (res.status !== 200) {
        alert('메뉴 수정에 실패했습니다.')
      } else {
        alert('메뉴 수정에 성공했습니다.')
        navigate(-1)
      }
    } else {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/restaurants/${id}/menus`, data)

      if (res.status === 401) {
        alert('로그인이 필요합니다.')
      } else if (res.status !== 201) {
        alert('메뉴 등록에 실패했습니다.')
      } else {
        alert('메뉴 등록에 성공했습니다.')
        navigate(-1)
      }
    }
  }

  const addIngre = () => {
    const ingre = inputIngreValue
    if (ingre === '') {
      alert('재료를 입력해주세요')
      return
    }
    setInputIngreValue('')

    const prev = getValues('ingre')

    setIngreInputValues((prev) => [...prev, ingre])
    setValue('ingre', [...prev, ingre])
  }

  const removeIngre = (index: number) => {
    setIngreInputValues((prev) => prev.filter((_, i) => i !== index))
    setValue(
      'ingre',
      ingreInputValues.filter((_, i) => i !== index),
    )
  }

  const addOption = () => {
    const opt: MenuOption[] = getValues('menuOptions') ?? []

    const option: MenuOption = {
      name: `${opt.length + 1}번 옵션`,
      items: [],
      _id: null,
      isSoldOut: false,
      maxSelect: 0,
      isRequired: false,
    }

    setOptions((prev) => [...prev, option])
    setValue('menuOptions', [...opt, option])
  }

  const removeOption = (index: number) => {
    setOptions((prev) => prev.filter((_, i) => i !== index))
    setValue(
      'menuOptions',
      getValues('menuOptions').filter((_: any, i: any) => i !== index),
    )
  }

  const addOptionItem = (index: number) => {
    const option = options[index]

    const item = {
      name: `${option.items.length + 1}번 사이드`,
      price: 0,
    }

    const items = option.items

    items.push(item)

    setValue(`menuOptions.${index}.items`, items)
    setOptions((prev) => {
      const newOptions = [...prev]
      newOptions[index].items = items
      return newOptions
    })
  }

  const removeOptionItem = (iIdx: number, moIdx: number) => {
    const option = options[moIdx]

    const items = option.items

    items.splice(iIdx, 1)

    setValue(`menuOptions.${moIdx}.items`, items)
    setOptions((prev) => {
      const newOptions = [...prev]
      newOptions[iIdx].items = items
      return newOptions
    })
  }

  const checkRequired = (index: number) => {
    const option = options[index]

    const isRequired = !option.isRequired

    setValue(`menuOptions.${index}.isRequired`, isRequired)
    setOptions((prev) => {
      const newOptions = [...prev]
      newOptions[index].isRequired = isRequired
      return newOptions
    })
  }

  const deleteMenu = async (menuId: string) => {
    const res = await axios.delete(`${process.env.REACT_APP_API_URL}/restaurants/${id}/menus/${menuId}`)

    if (res.status === 401) {
      alert('로그인이 필요합니다.')
    } else if (res.status !== 200) {
      alert('메뉴 삭제에 실패했습니다.')
    } else {
      alert('메뉴 삭제에 성공했습니다.')
      navigate(-1)
    }
  }

  useEffect(() => {
    if (!!state && !!state.category) {
      setValue('category', state.category)
    }
    if (!!state && !!state.menu) {
      reset(state.menu)
      if (menu.ingre !== undefined) {
        setIngreInputValues([...menu.ingre])
      }
      if (menu.menuOptions !== undefined) {
        setOptions(menu.menuOptions)
      }
      if (menu.img !== undefined && isInstanceOfImage(menu.img)) {
        setMenuImage(menu.img)
      }
    }
  }, [])

  return (
    <>
      <Header
        HeaderName="메뉴"
        Left={<Dismiss20Regular style={{ cursor: 'pointer' }} onClick={() => navigate(-1)} />}
        Right={
          <CompleteButton $isActive={formState.isValid} type="submit" form="form">
            완료
          </CompleteButton>
        }
      ></Header>
      <MenuBody>
        <Form id="form" onSubmit={handleSubmit(submitMenuForm)}>
          <FormItemContainer>
            <FormItemInput
              type="text"
              {...register('name', {
                required: true,
              })}
              placeholder="메뉴 이름을 입력해주세요"
            />
          </FormItemContainer>
          <FormItemContainer>
            {menuImage != null ? (
              <>
                <ImageContainer>
                  <ImageItem src={process.env.REACT_APP_STATIC_URL + menuImage.path} alt="" />
                </ImageContainer>
                <UpdateMenuImageButton htmlFor="menuImage">
                  <Image20Filled color="#666666" style={{ marginRight: '0.8rem' }} />
                  사진 변경
                </UpdateMenuImageButton>
              </>
            ) : (
              <>
                <ImageSample>
                  <ImageWrapper>
                    <Image72Filled color="#CCCCCC" />
                  </ImageWrapper>
                </ImageSample>
                <AddMenuImageButton htmlFor="menuImage">
                  <AddCircle20Filled color="#3FBA73" style={{ marginRight: '0.8rem' }} />
                  사진 추가
                </AddMenuImageButton>
              </>
            )}
            <input id="menuImage" type="file" accept="image/*" onChange={uploadImage} hidden />
          </FormItemContainer>
          <FormItemContainer>
            <FormItmeHeader>
              <FormItemLabel>가격</FormItemLabel>
            </FormItmeHeader>

            <FormInputContainer>
              <FormInputInContainer
                type="number"
                {...register('price', {
                  required: true,
                })}
                placeholder="가격을 입력해주세요"
              />
              <FormItemInputDecorator>원</FormItemInputDecorator>
            </FormInputContainer>
          </FormItemContainer>
          <FormItemContainer>
            <FormItmeHeader>
              <FormItemLabel>설명</FormItemLabel>
            </FormItmeHeader>
            <FormItemTextField {...register('description')} placeholder="메뉴에 대한 설명을 입력해주세요" />
          </FormItemContainer>
          <FormItemContainer>
            <FormItmeHeader>
              <FormItemLabel>주요 재료</FormItemLabel>
            </FormItmeHeader>
            <FormInputContainer>
              <FormInputInContainer
                type="text"
                value={inputIngreValue}
                onChange={(e: any) => setInputIngreValue(e.target.value)}
                placeholder="주요 재료를 입력해주세요"
              />
              <AddCircle24Filled style={{ cursor: 'pointer' }} color="#3FBA73" onClick={() => addIngre()} />
            </FormInputContainer>
            <IngreList>
              {ingreInputValues.map((ingre: string, index: number) => {
                return (
                  <IngreContainer key={uuidv4()}>
                    <RedSubtractCircle20Filled
                      onClick={() => {
                        removeIngre(index)
                      }}
                    />
                    <IngreContent>{ingre}</IngreContent>
                  </IngreContainer>
                )
              })}
              <input id="ingre" type="hidden" {...register(`ingre`)} />
            </IngreList>
            <FormItemContainer>
              <FormItmeHeader>
                <FormItemLabel>옵션</FormItemLabel>
                <OptionAddButton onClick={addOption}>
                  <Add20Filled color="#3FBA73" />
                  옵션 추가
                </OptionAddButton>
              </FormItmeHeader>

              <OptionList>
                {options.map((option: MenuOption, moIdx: number) => {
                  return (
                    <OptionContainer key={uuidv4()}>
                      <OptionHeader>
                        <OptionHeaderFront>
                          <RedSubtractCircle20Filled onClick={() => removeOption(moIdx)} />
                          <TransparantInput
                            type="text"
                            {...register(`menuOptions.${moIdx}.name`, {
                              required: true,
                            })}
                            placeholder="옵션 이름"
                          />
                        </OptionHeaderFront>

                        <OptionHeaderBack $isRequired={option.isRequired} onClick={() => checkRequired(moIdx)}>
                          <CheckBoxContainer>
                            {option.isRequired ? (
                              <CheckmarkCircle20Filled color="#3FBA73" />
                            ) : (
                              <RadioButton20Regular color="#AAAAAA" />
                            )}
                          </CheckBoxContainer>
                          필수 옵션
                        </OptionHeaderBack>
                      </OptionHeader>
                      <OptionItemList>
                        {option.items &&
                          option.items.map((item, iIdx) => {
                            return (
                              <OptionItem key={uuidv4()} $index={iIdx}>
                                <OptionItemLeft>
                                  <RedSubtractCircle20Filled onClick={() => removeOptionItem(iIdx, moIdx)} />
                                  <OptionItemContent>
                                    <OptionItemName>
                                      <TransparantInput
                                        type="text"
                                        {...register(`menuOptions.${moIdx}.items.${iIdx}.name`, {
                                          required: true,
                                        })}
                                        placeholder="옵션 항목 이름"
                                      />
                                    </OptionItemName>
                                    <OptionItemPrice>
                                      <TransparantInput
                                        type="number"
                                        {...register(`menuOptions.${moIdx}.items.${iIdx}.price`, {
                                          required: true,
                                        })}
                                        placeholder="옵션 항목 가격"
                                      />
                                    </OptionItemPrice>
                                  </OptionItemContent>
                                </OptionItemLeft>
                                <OptionItemReOrder />
                              </OptionItem>
                            )
                          })}
                      </OptionItemList>
                      <AddOptionButton onClick={() => addOptionItem(moIdx)}>
                        <Add20Filled color="#3FBA73" />
                        옵션 항목 추가
                      </AddOptionButton>
                    </OptionContainer>
                  )
                })}
              </OptionList>
            </FormItemContainer>
          </FormItemContainer>
          <input type="text" {...register('category')} placeholder="카테고리를 입력해주세요" hidden />
        </Form>
      </MenuBody>
      {/* 메뉴 삭제 버튼 */}
      {!!menu._id && (
        <DeleteMenuButtonWrapper onClick={() => deleteMenu(menu._id)}>
          <DeleteMenuButton>메뉴 삭제</DeleteMenuButton>
        </DeleteMenuButtonWrapper>
      )}
    </>
  )
}

export default CreateOrUpdateMenuPage

const DeleteMenuButton = styled.button`
  width: 100%;
  height: 5.2rem;
  font-size: ${({ theme }) => theme.FONT_SIZE.medium};
  color: #ff4f4f;
  border-radius: 1.2rem;
  background-color: #f7f7f7;
  border: none;
  cursor: pointer;
`

const DeleteMenuButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  bottom: 0;
  width: 100%;
  height: 8rem;
  background-color: #ffffff;
  padding: 0 2rem 0 2rem;
`

const TransparantInput = styled.input`
  background-color: transparent;
  border: none;
`

const OptionItemPrice = styled.div`
  * {
    font-size: ${({ theme }) => theme.FONT_SIZE.small};
    color: #666666;
  }
`

const OptionItemName = styled.div`
  * {
    font-size: ${({ theme }) => theme.FONT_SIZE.medium};
  }
`
const OptionItemLeft = styled.div`
  display: flex;
  align-items: center;
  margin-right: 1.2rem;
`
const OptionItemContent = styled.div`
  display: flex;
  flex-direction: column;
`
const OptionItemReOrder = styled(ReOrder20Regular)`
  color: #aaaaaa;
`
const CheckBoxContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  * {
    margin-right: 0.8rem;
  }
`

const OptionHeaderBack = styled.div<{ $isRequired: boolean }>`
  display: flex;
  align-items: center;
  font-size: ${({ theme }) => theme.FONT_SIZE.medium};
  ${(props) => (props.$isRequired ? 'color: #3FBA73;' : 'color: #AAAAAA;')}
  font-weight: bold;
`

const OptionHeaderFront = styled.div`
  display: flex;
  align-items: center;

  * {
    font-size: ${({ theme }) => theme.FONT_SIZE.medium};
    font-weight: bold;
  }
`
const AddOptionButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #3fba73;
  background-color: rgba(63, 186, 115, 0.1);
  border-radius: 1.2rem;
  height: 5.2rem;
  font-size: ${({ theme }) => theme.FONT_SIZE.medium};
  * {
    margin-right: 0.8rem;
  }
`
const OptionItemList = styled.div``
const OptionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.2rem;
`
const OptionItem = styled.div<{ $index: number }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.2rem 0 1.2rem 0;
  ${(props) => (props.$index !== 0 ? 'border-top: 0.1rem solid #F0F0F0 ;' : '')}//   border: 1px solid #f0f0f0;
`
const OptionContainer = styled.div`
  background-color: #fafafa;
  border-radius: 1.2rem;
  padding: 1.6rem;
  margin-bottom: 1.6rem;
`
const OptionList = styled.div`
  display: flex;
  flex-direction: column;
`
const OptionAddButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #3fba73;
  font-size: ${({ theme }) => theme.FONT_SIZE.medium};
  * {
    margin-right: 0.8rem;
  }
  cursor: pointer;
`
const IngreContent = styled.span`
  font-size: ${({ theme }) => theme.FONT_SIZE.small};
  color: #666666;
`

const IngreList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
  margin-top: 0.8rem;
  margin-bottom: 4rem;
`

const IngreContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: fit-content;
  height: 3.6rem;
  border-radius: 1.8rem;
  padding: 0.8rem;
  background-color: #f7f7f7;
`
const RedSubtractCircle20Filled = styled(SubtractCircle20Filled)`
  color: #ff4f4f;
  margin-right: 0.8rem;
`

const FormItemInputDecorator = styled.span`
  font-size: ${({ theme }) => theme.FONT_SIZE.medium};
  color: #999999;
  cursor: default;
`
const CompleteButton = styled.button<{ $isActive: boolean }>`
  color: ${(props) => (props.$isActive ? '#3fba73' : '#AAAAAA')};
  font-size: ${({ theme }) => theme.FONT_SIZE.medium};
  background-color: transparent;
  cursor: pointer;
`

const UpdateMenuImageButton = styled.label`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 5.2rem;
  font-size: ${({ theme }) => theme.FONT_SIZE.medium};
  color: #666666;
  border-radius: 1.2rem;
  background-color: #f7f7f7;
`

const ImageItem = styled.img`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  object-fit: cover;
  border-radius: 1.2rem;
`
const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  // 가로세로 비율 1:1
  padding-bottom: 100%;
  height: 0;
  border-radius: 1.2rem;
  margin-bottom: 1.2rem;
`

const AddMenuImageButton = styled.label`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 5.2rem;
  font-size: ${({ theme }) => theme.FONT_SIZE.medium};
  color: #3fba73;
  border-radius: 1.2rem;
  background-color: rgba(63, 186, 115, 0.1);
  cursor: pointer;
`

const Image72Filled = styled(Image24Filled)`
  width: 7.2rem;
  height: 7.2rem;
`

const ImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  position: absolute;
`

const ImageSample = styled.div`
  width: 100%;
  // 가로세로 비율 1:1
  padding-bottom: 100%;
  height: 0;
  position: relative;
  background-color: #f7f7f7;
  border-radius: 1.2rem;
  margin-bottom: 1.2rem;
`

const MenuBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Form = styled.form`
  width: 100%;
  padding: 0 2rem 0 2rem;
`
