import React, { useState } from 'react'
import styled from 'styled-components'

interface FormProps {
  onSubmit: (request: string) => void
}

const StyledContainer = styled.div`
  width: 900px;
  padding: 25px;
  font-size: 25px;
`
const StyledInput = styled.input`
  width: 850px;
  padding: 20px;
  font-size: 25px;
`
const SpecialInstructions: React.FC<FormProps> = ({ onSubmit }) => {
  const [inputValue, setInputValue] = useState('')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onSubmit(inputValue)
    setInputValue('')
  }

  return (
    <StyledContainer>
      <h2>Special Instructions</h2>
      <form onSubmit={handleSubmit}>
        <StyledInput type="text" value={inputValue} onChange={handleInputChange} />
      </form>
    </StyledContainer>
  )
}

export default SpecialInstructions
