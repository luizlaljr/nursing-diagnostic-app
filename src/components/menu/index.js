import React, { useState } from 'react'
import Hamburguer from '../utils/hamburguer/hamburguer'
import styles from './styles.module.scss'

function menu() {
  const [open, setOpen] = useState(false)

  const handleClick = () => {
    setOpen(!open)
  }

  return (
    <div className={styles.menuSection}>
      <div
        className={open ? styles.menuSectionOpen : styles.menuSectionClosed}
      ></div>
      <nav className={!open ? styles.nav : styles.navOn}>
        <a href="/">Início</a>
        <a className={styles.actived} href="">
          Domínios
        </a>
        <a href="">Sobre</a>
      </nav>
      <Hamburguer onClick={handleClick} open={open} />
    </div>
  )
}

export default menu
