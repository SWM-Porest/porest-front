import { ReactComponent as ChebronR } from 'assets/ChevronR.svg'
import { ReactComponent as Meal } from 'assets/Meal.svg'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

interface OwnProps {
  restaurant_id: string
  restaurant_name: string
  restaurant_address: string
}

const RestaurantInfo: React.FC<OwnProps> = ({ restaurant_id, restaurant_name, restaurant_address }) => {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate('/restaurants/' + restaurant_id)
  }
  return (
    <Container onClick={handleClick}>
      <ContentsContainer>
        <Meal />
        <TextContainer>
          <Name>{restaurant_name}</Name>
          <Address>{restaurant_address}</Address>
        </TextContainer>
      </ContentsContainer>
      <ChebronR />
    </Container>
  )
}

export default RestaurantInfo

const Container = styled.div`
  display: flex;
  width: 100%;
  padding: 1.2rem 2rem;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ theme }) => theme.COLOR.common.white[0]};
`

const ContentsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1.6rem;
`

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.4rem;
`

const Name = styled.h4`
  color: ${({ theme }) => theme.COLOR.common.gray[20]};
  margin: 0;
  font-style: normal;
  font-weight: 700;
  line-height: 2rem;
`
const Address = styled.h5`
  color: ${({ theme }) => theme.COLOR.common.gray[40]};
  margin: 0;
  font-style: normal;
  font-weight: 400;
  line-height: 1.6rem;
`
