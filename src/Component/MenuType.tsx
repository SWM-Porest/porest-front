import React from 'react'
import styles from './MenuType.module.css' // CSS 모듈 import

const MenuType: React.FC = () => {
  return (
    <div className={styles['type-container']}>
      <div>Typeimage</div>
      <div>
        <p>식사류</p>
      </div>
    </div>
  )
}

export default MenuType
