import { Restaurant } from 'model/restaurant'
import React from 'react'

interface OwnProps {
  info: Restaurant
}
const Store: React.FC<OwnProps> = ({ info }) => {
  return (
    <div>
      <p>Store</p>
      {/* <div className={styles.box}>Store</div> */}
      <div>{info.name}</div>
      <div>{info.address.city}</div>
      <div>{info.address.detail}</div>
      <div>{info.address.zipCode}</div>
      <div>{info.category}</div>
    </div>
  )
}

export default Store
