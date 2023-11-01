import { MenuOption } from 'Api/OrderInterface'
import { Checkbox } from 'antd'
import React from 'react'
import styled from 'styled-components'

const OptionSelector: React.FC<{
  option: MenuOption
  selectedItems: string[]
  onSelect: (selectedItems: string[]) => void
}> = ({ option, selectedItems, onSelect }) => {
  const handleCheckboxChange = (itemName: string) => {
    const updatedSelectedItems = selectedItems.includes(itemName)
      ? selectedItems.filter((item) => item !== itemName)
      : [...selectedItems, itemName]
    onSelect(updatedSelectedItems)
  }

  return (
    <StyledContainer>
      <OptionTitle>
        <OptionTitleText>선택 옵션</OptionTitleText>
        <OptionTitleText>{option.name}</OptionTitleText>
      </OptionTitle>
      <OptionContainer>
        {option.items.map((item: any) => (
          <LargeButton key={item.name} selected={selectedItems.includes(item.name)}>
            <ItemContainer>
              <Checkbox checked={selectedItems.includes(item.name)} onChange={() => handleCheckboxChange(item.name)} />
              <ItemName>{item.name}</ItemName>
            </ItemContainer>
            <StyledPrice selected={selectedItems.includes(item.name)}> + {item.price}원</StyledPrice>
          </LargeButton>
        ))}
      </OptionContainer>
    </StyledContainer>
  )
}

export default OptionSelector

const StyledContainer = styled.div`
  display: inline-flex;
  padding: 2rem 0 0.4rem 0;
  flex-direction: column;
  align-items: center;
  gap: 1.2rem;
  width: 100%;
  cursor: default;
`

const OptionTitle = styled.div`
  display: flex;
  width: 100%;
  padding: 2rem;
  justify-content: space-between;
  align-items: flex-start;
`

const OptionTitleText = styled.h3`
  color: ${({ theme }) => theme.COLOR.common.gray[20]};
  margin: 0;
  font-style: normal;
  font-weight: 600;
  line-height: 2.4rem;
`
const OptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
`

const LargeButton = styled.div<{ selected: boolean }>`
  display: flex;
  width: 100%;
  padding: 1.6rem 2rem;
  justify-content: space-between;
  align-items: center;
`
const ItemContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
`
const ItemName = styled.span`
  color: ${({ theme }) => theme.COLOR.common.gray[20]};
  font-family: Pretendard;
  font-size: 1.6rem;
  font-style: normal;
  font-weight: 400;
  line-height: 2rem;
`

const StyledPrice = styled.span<{ selected: boolean }>`
  color: ${({ theme }) => theme.COLOR.common.gray[20]};
  font-size: 1.6rem;
  font-style: normal;
  font-weight: 400;
  line-height: 2rem;
`
