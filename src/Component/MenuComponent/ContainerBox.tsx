import React from 'react'
import { styled } from 'styled-components'

const Container = styled.div`
  width: 80%;
  margin: auto;
  margin-top: 280;
`

const ContainerBox = ({ children }: any) => {
  return (
    <div>
      <Container>{children}</Container>
    </div>
  )
}

export default ContainerBox
