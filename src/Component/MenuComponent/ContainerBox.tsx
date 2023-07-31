import { styled } from 'styled-components'

const ContainerBox = ({ children }: any) => {
  return (
    <div style={{ background: 'white' }}>
      <Container>{children}</Container>
    </div>
  )
}

export default ContainerBox

const Container = styled.div`
  width: 80%;
  margin: auto;
  margin-bottom: 48pt;
`
