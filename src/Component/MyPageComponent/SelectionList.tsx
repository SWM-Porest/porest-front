import { ReactComponent as ChevronR } from 'assets/ChevronR.svg'
import styled from 'styled-components'

interface OwnProps {
  Icon?: React.ReactNode | undefined
  Name: string
  onClick?: () => void
}

const SelectionList: React.FC<OwnProps> = ({ Icon, Name, onClick }) => {
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
      <ChevronR />
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
  background-color: ${({ theme }) => theme.COLOR.common.white[0]};
  cursor: pointer;
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
