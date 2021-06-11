import React from 'react'

import styles from './styles.module.scss'

function hamburguer({ onClick, open }) {
  return (
    <div onClick={onClick} className={styles.menuToggle}>
      <div className={open ? styles.toggleOpen : styles.toggleClose}>
        <div className={styles.one}></div>
        <div className={styles.two}></div>
        <div className={styles.three}></div>
      </div>
    </div>
  )
}

export default hamburguer
