import React from 'react'
import { Link } from 'react-router-dom'

const footer: React.FC = () => {
  return (
    <div>
      <Link to="/cart">장바구니로 가기</Link>
    </div>
  )
}

export default footer
