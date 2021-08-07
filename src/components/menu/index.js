import React, { useState } from 'react'
import { useRouter } from 'next/router'
import Hamburguer from '../utils/hamburguer/hamburguer'
import styles from './styles.module.scss'

function menu() {
  const [open, setOpen] = useState(false)

  const { asPath } = useRouter()

  const handleClick = () => {
    setOpen(!open)
  }

  return (
    <div className={styles.menuSection}>
      <div
        className={open ? styles.menuSectionOpen : styles.menuSectionClosed}
      ></div>
      <nav className={!open ? styles.nav : styles.navOn}>
        <a className={asPath === '/' ? styles.actived : ''} href="/">
          Início
        </a>
        <a className={asPath !== '/about' ? styles.actived : ''} href="/begin">
          Coleta de Dados
        </a>
        <a className={asPath === '/about' ? styles.actived : ''} href="/about">
          Sobre
        </a>
      </nav>
      <Hamburguer onClick={handleClick} open={open} />
    </div>
  )
}

export default menu
