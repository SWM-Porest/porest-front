import React from 'react'
import { styled } from 'styled-components'

const Categoryul = styled.ul`
  margin: 6px;
  display: flex;
  padding: 0;
`

const Categoryli = styled.li`
  display: inline;
  font-size: 2rem;
  font-weight: bold;
  border-radius: 14.5px;
  color: #fff;
  position: realtive;
  padding: 12px 16px;
  margin: 6px;
  letter-spacing: -0.3px;
  text-align: center;
  background-color: #424242;
`

const Categories = ({ ingre }: any) => {
  const ulelem = ingre.map((elem: string) => {
    return <Categoryli>{elem}</Categoryli>
  })

  return (
    <React.Fragment>
      <h2 style={{ fontSize: '3rem', margin: '16px' }}>제목</h2>
      <Categoryul>{ulelem}</Categoryul>
    </React.Fragment>
  )
}

export default Categories
