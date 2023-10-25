import { styled } from 'styled-components'

export const FormItemLabel = styled.div`
  font-size: 1.6rem;
  font-weight: bold;
`
export const FormItemInput = styled.input`
  width: 100%;
  height: 6rem;
  border: 1px solid #f7f7f7;
  border-radius: 1.2rem;
  padding: 1.2rem;
  font-size: ${({ theme }) => theme.FONT_SIZE.medium};
`
export const FormItemContainer = styled.div`
  margin-bottom: 24pt;
  width: 100%;
`

export const FormItemTextField = styled.textarea`
  width: 100%;
  border: 1px solid #f7f7f7;
  border-radius: 1.2rem;
  height: 10.8rem;
  padding: 1.6rem;
  resize: none;
  font-size: ${({ theme }) => theme.FONT_SIZE.medium};
`

export const FormInputContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 6rem;
  border: 1px solid #f7f7f7;
  border-radius: 1.2rem;
  padding: 1.6rem;
`
export const FormInputInContainer = styled.input`
  width: 100%;
  font-size: ${({ theme }) => theme.FONT_SIZE.medium};
  display: flex;
  align-items: center;
  justify-content: center;
`

export const FormItmeHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.6rem;
  cursor: default;
`
