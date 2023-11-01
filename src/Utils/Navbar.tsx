import React from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
interface HeaderProps {
  Icon?: { [key: string]: React.ReactNode }
  index: number
}

const Navbar: React.FC<HeaderProps> = ({ Icon, index }) => {
  const navigate = useNavigate()

  const handleHomeClick = () => {
    navigate('/restaurants')
  }

  const handlePersonClick = () => {
    navigate('/mypage')
  }

  return (
    <StyledNavbar>
      {Icon &&
        Object.keys(Icon).map((propName, mapIndex) => (
          <IconContainer
            key={mapIndex}
            onClick={propName === '홈' ? handleHomeClick : propName === '마이' ? handlePersonClick : undefined}
          >
            {Icon[propName]}
            <Text style={{ color: mapIndex === index ? 'green' : 'black' }}>{propName}</Text>
          </IconContainer>
        ))}
    </StyledNavbar>
  )
}

export default Navbar

const StyledNavbar = styled.nav`
  display: flex;
  width: 100%;
  height: 6rem;
  align-items: center;
  flex-shrink: 0;
  background-color: ${({ theme }) => theme.COLOR.common.white[0]};
`

const IconContainer = styled.div`
  display: flex;
  height: 6rem;
  padding: 1rem 0;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.4rem;
  flex: 1 0 0;
  cursor: pointer;
`

const Text = styled.div`
  text-align: center;
  font-size: 1rem;
  font-style: normal;
  font-weight: 500;
  line-height: 1.2rem;
`
