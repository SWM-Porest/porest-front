import React, { useState } from 'react'
import styled from 'styled-components'
interface OwnProps {
  hasSpicyLevel: boolean
  onSpicyLevelSelected: (level: number) => void
}
const StyledSpicy = styled.div`
  display: flex;
`
const StyledContainer = styled.div`
  width: 900px;
  padding: 25px;
  font-size: 25px;
`

const SelectSpicy: React.FC<OwnProps> = ({ hasSpicyLevel, onSpicyLevelSelected }) => {
  const [selectedLevel, setSelectedLevel] = useState<number | null>(null)

  const handleLevelSelect = (level: number) => {
    setSelectedLevel(level)
    onSpicyLevelSelected(level)
  }

  if (!hasSpicyLevel) {
    return null // SpicyLevel이 없는 메뉴인 경우 컴포넌트를 보이지 않도록 처리
  }

  return (
    <StyledContainer>
      <h2>Spicy Level</h2>
      <StyledSpicy>
        <div>
          <label>
            <input
              type="radio"
              name="spicyLevel"
              value={1}
              checked={selectedLevel === 1}
              onChange={() => handleLevelSelect(1)}
            />
            Mild
          </label>
        </div>
        <div>
          <label>
            <input
              type="radio"
              name="spicyLevel"
              value={2}
              checked={selectedLevel === 2}
              onChange={() => handleLevelSelect(2)}
            />
            Medium
          </label>
        </div>
        <div>
          <label>
            <input
              type="radio"
              name="spicyLevel"
              value={3}
              checked={selectedLevel === 3}
              onChange={() => handleLevelSelect(3)}
            />
            Spicy
          </label>
        </div>
      </StyledSpicy>
    </StyledContainer>
  )
}

export default SelectSpicy
