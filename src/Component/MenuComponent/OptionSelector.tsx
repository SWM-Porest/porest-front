import { MenuOption } from 'Api/OrderInterface'
import React from 'react'

const OptionSelector: React.FC<{
  option: MenuOption
  selectedItems: string[]
  onSelect: (selectedItems: string[]) => void
}> = ({ option, selectedItems, onSelect }) => {
  return (
    <div>
      <h3>{option.name}</h3>
      {option.items.map((item: any) => (
        <div key={item.name}>
          <button
            onClick={() => {
              if (selectedItems.length < option.maxSelect || selectedItems.includes(item.name)) {
                const newSelectedItems = selectedItems.includes(item.name)
                  ? selectedItems.filter((itemName) => itemName !== item.name)
                  : [...selectedItems, item.name]
                onSelect(newSelectedItems)
              }
            }}
            style={{
              backgroundColor: selectedItems.includes(item.name) ? 'lightblue' : 'white',
            }}
          >
            {item.name} - {item.price}원
          </button>
        </div>
      ))}
    </div>
  )
}

export default OptionSelector
