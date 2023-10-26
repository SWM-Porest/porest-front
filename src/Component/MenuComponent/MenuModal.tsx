import SliderContainer from 'Component/MenuBoardComponent/SliderContainer'
import { useRestaurantState } from 'Context/restaurantContext'
import AmountCheck from 'Utils/AmountCheck'
import getImageSrc from 'Utils/getImageSrc'
import { ReactComponent as Dismiss } from 'assets/Dismiss.svg'
import { useEffect, useState } from 'react'
import { styled } from 'styled-components'
import AddCart from './AddCart'
import Categories from './Categories'
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
    <ModalContainer>
      <ModalView $load={isOpen} onClick={(e) => e.stopPropagation()}>
        <ContentContainer>
          <SliderContainer
            images={menu ? [getImageSrc(menu.img)] : []}
            lefticon={
              <IconLeft
                onClick={() => {
                  openModalHandler(menu ? menu._id : '')
                }}
              >
                <Dismiss width="2rem" height="2rem" />
              </IconLeft>
            }
          />
          <DescriptionContainer
            title={menu ? menu.name : ''}
            price={menu ? menu.price : 0}
            description={menu ? menu.description : ''}
          ></DescriptionContainer>

          <div>
            <Categories ingre={menu ? menu.ingre : []}></Categories>
            {menu?.options.map((option) => (
              <OptionSelector
                key={option._id}
                option={option}
                selectedItems={selectedOptions[option._id]?.map((item) => item.name) || []}
                onSelect={(selectedItems) => handleOptionSelect(option._id, selectedItems)}
              />
            ))}
          </div>
          <Container1>
            <Container2>수량 선택</Container2>
            <StyledAmountContainer>
              <AmountCheck count={count} handleIncrement={handleIncrement} handleDecrement={handleDecrement} />
            </StyledAmountContainer>
          </Container1>

          <AddCart
            menu={menu ? menu : null}
            cnt={count}
            openModalHandler={openModalHandler}
            selectedOptions={selectedOptions}
          />
        </ContentContainer>
      </ModalView>
    </ModalContainer>
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
  @media screen and (min-width: ${({ theme }) => theme.MEDIA.tablet}) {
    width: ${({ theme }) => theme.MEDIA.mobile};
  }
`

const ModalView = styled.div<{ $load: boolean }>`
  z-index: 31;
  position: fixed;
  bottom: ${(props) => (props.$load ? '0' : '-100%')};
  width: 100vw;
  height: 100%;
  background-color: ${({ theme }) => theme.COLOR.common.white[0]};
  transition: all 0.6s cubic-bezier(0.22, 0.61, 0.36, 1);
  @media screen and (min-width: ${({ theme }) => theme.MEDIA.tablet}) {
    width: ${({ theme }) => theme.MEDIA.mobile};
  }
`
const ContentContainer = styled.div`
  overflow-y: auto;
  max-height: calc(100% - 72pt);
  position: relative;
`

const Container1 = styled.div`
  display: flex;
  padding: 2rem;
  justify-content: space-between;
  align-items: center;
`
const Container2 = styled.div`
  color: ${({ theme }) => theme.COLOR.common.gray[20]};
  font-family: Pretendard;
  font-size: 2rem;
  font-style: normal;
  font-weight: 600;
  line-height: 2rem;
  cursor: default;
`

const Icon = styled.div`
  display: inline-flex;
  padding: 1rem;
  align-items: flex-start;
  gap: 1rem;
  border-radius: 2rem;
  background: ${({ theme }) => theme.COLOR.common.white[0]};
  box-shadow: 0 0.2rem 1.2rem 0 rgba(0, 0, 0, 0.16);
  position: absolute;
  top: 1rem;
  cursor: pointer;
`

const IconLeft = styled(Icon)`
  left: 1.2rem;
`
