import { Menu } from 'model/restaurant'
import React from 'react'
import styles from './MenuCard.module.css' // CSS 모듈 import

interface OwnProps {
  info: Menu
}
const MenuCard: React.FC<OwnProps> = ({ info }) => {
  return (
    <div className={styles['card-container']}>
      <div>{info.name}</div>
      <div>{info.price}</div>
    </div>
  )
}
export default MenuCard
