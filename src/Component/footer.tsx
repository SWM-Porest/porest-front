import React from 'react'
import { Link } from 'react-router-dom'
import styles from './footer.module.css' // CSS 모듈 import

const footer: React.FC = () => {
  return (
    <div className={styles['header-container']}>
      <Link to="/cart" className={styles['gotocart']}>
        장바구니로 가기
      </Link>
    </div>
  )
}

export default footer
