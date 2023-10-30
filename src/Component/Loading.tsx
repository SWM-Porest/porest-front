import { Spin } from 'antd'
import { styled } from 'styled-components'

const Loading = () => {
  return (
    <StyledSpin tip="Loading" size="large">
      <div className="content" />
    </StyledSpin>
  )
}

export default Loading

const StyledSpin = styled(Spin)`
  &&& {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) scale(2);
  }
`
