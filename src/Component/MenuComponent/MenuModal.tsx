import { faXmark } from '@fortawesome/free-solid-svg-icons'
import Header from 'Component/Header'
import { CloseButton, CloseButtonContainer } from 'Component/Modal/CartModal'
import { useRestaurantState } from 'Context/restaurantContext'
import AmountCheck from 'Utils/AmountCheck'
import { useEffect, useState } from 'react'
import { styled } from 'styled-components'
import AddCart from './AddCart'
import Categories from './Categories'
import ContainerBox from './ContainerBox'
import DescriptionContainer from './DescriptionContainer'
import OptionSelector from './OptionSelector'

interface OwnProps {
  id: string
  isOpen: boolean
  openModalHandler: (menuId: string) => void
}

export const MenuModal: React.FC<OwnProps> = ({ id, isOpen, openModalHandler }) => {
  const { data: restaurant, loading, error } = useRestaurantState().restaurant
  const menu = restaurant?.menus.find((e) => {
    return e._id === id
  })

  if (isOpen) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = 'auto'
  }

  if (loading) return <div>로딩중 ... </div>
  if (error) return <div>에러가 발생했습니다.</div>
  const [count, setCount] = useState(1)
  const [selectedOptions, setSelectedOptions] = useState<{ [optionId: string]: { name: string; price: number }[] }>({})

  const handleIncrement = () => {
    setCount(count + 1)
  }

  const handleDecrement = () => {
    if (count === 1) return
    setCount(count - 1)
  }
  useEffect(() => {
    setCount(1)
    setSelectedOptions({})
  }, [openModalHandler])

  const handleOptionSelect = (optionId: string, selectedItems: string[]) => {
    const selectedOptionObjects = selectedItems.map((item) => ({
      name: item,
      price:
        menu?.options.find((option) => option._id === optionId)?.items.find((optItem) => optItem.name === item)
          ?.price || 0,
    }))

    setSelectedOptions((prevSelectedOptions) => ({
      ...prevSelectedOptions,
      [optionId]: selectedOptionObjects,
    }))
  }

  return (
    <>
      <ModalContainer>
        <ModalBackdrop
          $load={isOpen}
          onClick={() => {
            openModalHandler(menu ? menu._id : '')
          }}
        />
        <ModalView $load={isOpen} onClick={(e) => e.stopPropagation()}>
          <Header
            HeaderName={''}
            Right={
              <CloseButtonContainer>
                <CloseButton
                  icon={faXmark}
                  onClick={() => {
                    openModalHandler(menu ? menu._id : '')
                  }}
                  size="2xl"
                />
              </CloseButtonContainer>
            }
          ></Header>
          <ContentContainer>
            <DescriptionContainer
              title={menu ? menu.name : ''}
              price={menu ? menu.price : 0}
              description={menu ? menu.description : ''}
              img={menu && menu.img ? process.env.REACT_APP_STATIC_URL + menu.img.path : ''}
            ></DescriptionContainer>
            <ContainerBox>
              <Categories ingre={menu ? menu.ingre : []}></Categories>
              {menu?.options.map((option) => (
                <OptionSelector
                  key={option._id}
                  option={option}
                  selectedItems={selectedOptions[option._id]?.map((item) => item.name) || []}
                  onSelect={(selectedItems) => handleOptionSelect(option._id, selectedItems)}
                />
              ))}
            </ContainerBox>
            <StyledAmountContainer>
              <AmountCheck count={count} handleIncrement={handleIncrement} handleDecrement={handleDecrement} />
            </StyledAmountContainer>

            <AddCart
              menu={menu ? menu : null}
              cnt={count}
              openModalHandler={openModalHandler}
              selectedOptions={selectedOptions}
            />
          </ContentContainer>
        </ModalView>
      </ModalContainer>
    </>
  )
}
const StyledAmountContainer = styled.div`
  padding-left: 50pt;
`
const ModalContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`
const ModalBackdrop = styled.div<{ $load: boolean }>`
  z-index: 30;
  height: 100vh;
  bottom: ${(props) => (props.$load ? '0' : '-100lvh')};
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: end;
  background-color: ${({ theme }) => theme.COLOR.common.gray[600]};
  ${(props) => (props.$load ? 'top: 0; left: 0; right: 0;' : '')};
`

const ModalView = styled.div<{ $load: boolean }>`
  z-index: 31;
  position: fixed;
  bottom: ${(props) => (props.$load ? '0' : '-100%')};
  border-radius: 40px 40px 0px 0px;
  width: 100%;
  height: 80%;
  background-color: ${({ theme }) => theme.COLOR.common.white};
  transition: all 0.6s cubic-bezier(0.22, 0.61, 0.36, 1);
`
const ContentContainer = styled.div`
  overflow-y: auto;
  max-height: calc(100% - 72px - 72pt); /* 헤더의 높이만큼 화면 높이에서 뺍니다. */
`
