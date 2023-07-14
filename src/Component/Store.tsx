import { Restaurant } from 'model/restaurant'
import React from 'react'
import MenuCard from './MenuCard'
import MenuType from './MenuType'
import styles from './Store.module.css' // CSS 모듈 import
interface OwnProps {
  info: Restaurant
}
const Store: React.FC<OwnProps> = ({ info }) => {
  return (
    <div>
      <p>Store</p>
      <img className={styles['restaurant-img']} src="img/restaurant-img.jpg" alt="레스토랑 메인 이미지" />
      <div className={styles['menutype']}>
        <MenuType />
        <MenuType />
        <MenuType />
        <MenuType />
      </div>
      <div className={styles['card-container']}>
        <MenuCard info={info.menu[0]} />
        <MenuCard info={info.menu[1]} />
        <MenuCard info={info.menu[2]} />
      </div>
    </div>
  )
}

export default Store
