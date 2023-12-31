import { ChevronRight20Filled } from '@fluentui/react-icons'
import styled from 'styled-components'

interface OwnProps {
  Icon?: React.ReactNode | undefined
  Name: string
  onClick?: () => void
  RightIcon?: React.ReactNode | undefined
}

const SelectionList: React.FC<OwnProps> = ({ Icon, Name, onClick, RightIcon }) => {
  const handleItemClick = () => {
    if (onClick) {
      onClick()
    }
  }

  return (
    <Container onClick={handleItemClick}>
      <ListContainer>
        {Icon}
        <ListName>{Name}</ListName>
      </ListContainer>
      {RightIcon || <ChevronRight20Filled color="#AAAAA" />}
    </Container>
  )
}

export default SelectionList

const Container = styled.div`
  display: flex;
  width: 100%;
  padding: 2rem;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  border-top: 1px solid ${({ theme }) => theme.COLOR.common.gray[110]};
`

const ListContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
`

const ListName = styled.div`
  color: ${({ theme }) => theme.COLOR.common.gray[20]};
  font-size: 1.6rem;
  font-style: normal;
  font-weight: 500;
  line-height: 2rem;
`
