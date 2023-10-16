import { MenuOption } from 'Api/OrderInterface'
import React from 'react'
import styled from 'styled-components'

const OptionSelector: React.FC<{
  option: MenuOption
  selectedItems: string[]
  onSelect: (selectedItems: string[]) => void
}> = ({ option, selectedItems, onSelect }) => {
  return (
    <StyledContainer>
      <h5 style={{ margin: 0, padding: '8pt 0' }}>{option.name}</h5>
      {option.items.map((item: any) => (
        <div key={item.name}>
          <LargeButton
            onClick={() => {
              if (selectedItems.length < option.maxSelect || selectedItems.includes(item.name)) {
                const newSelectedItems = selectedItems.includes(item.name)
                  ? selectedItems.filter((itemName) => itemName !== item.name)
                  : [...selectedItems, item.name]
                onSelect(newSelectedItems)
              }
            }}
            selected={selectedItems.includes(item.name)} // 아이템이 선택되었는지 여부를 프롭스로 전달
          >
            <span>{item.name}</span>
            <StyledPrice selected={selectedItems.includes(item.name)}> + {item.price}원</StyledPrice>
          </LargeButton>
        </div>
      ))}
    </StyledContainer>
  )
}

export default OptionSelector

const StyledContainer = styled.div`
  margin: 8pt 0;
  padding: 0;
`

const LargeButton = styled.div<{ selected: boolean }>`
  padding: 24pt 24pt;
  margin: 16pt 0;
  font-size: 1.9rem;
  border-radius: 16pt;
  background-color: ${({ selected, theme }) => (selected ? theme.COLOR.sub : 'white')};
  color: ${({ selected, theme }) => (selected ? theme.COLOR.common.white : 'black')};
`
const StyledPrice = styled.span<{ selected: boolean }>`
  float: right;
  color: ${({ selected, theme }) => (selected ? theme.COLOR.common.white[0] : theme.COLOR.number_price)};
`
