import { Menu } from 'model/restaurant'
import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
interface OwnProps {
  info: Menu
}

const StyledLink = styled(Link)`
  text-align: center;
  padding: 20px;
  padding: 30px;
  margin: 10px;
  background-color: lightgray;
  font-size: 30px;
`

const MenuCard: React.FC<OwnProps> = ({ info }) => {
  return (
    <StyledLink to="/menu">
      <div>{info.name}</div>
      <div>{info.price}</div>
    </StyledLink>
  )
}
export default MenuCard
