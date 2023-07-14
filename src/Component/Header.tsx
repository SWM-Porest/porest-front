import React from 'react'
import { Link } from 'react-router-dom'
import styles from './Header.module.css' // CSS 모듈 import

interface HeaderProps {
  restaurantName: string
}

const Header: React.FC<HeaderProps> = ({ restaurantName }) => {
  return (
    <div className={styles['header-container']}>
      <Link to="/" className={styles['restaurant-name']}>
        {restaurantName}
      </Link>
      <Link to="/cart">
        <img className={`${styles['cart-icon']} ${styles['cart-icon-small']}`} src="img/cart-icon.png" alt="장바구니" />
      </Link>
    </div>
  )
}

export default Header
