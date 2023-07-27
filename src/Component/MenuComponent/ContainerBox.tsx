import { styled } from 'styled-components'

const Container = styled.div`
  width: 80%;
  margin: auto;
  margin-bottom: 50px;
`

const ContainerBox = ({ children }: any) => {
  return (
    <div style={{ background: 'white' }}>
      <Container>{children}</Container>
    </div>
  )
}

export default ContainerBox
