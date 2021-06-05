import React from 'react'
import styles from './styles.module.scss'

import logo from '../../assets/logo.svg'

function Header() {
  return (
    <header className={styles.container}>
      <div className={styles.content}>
        <div className={styles.logo}>
          <div className={styles.image}>
            <img src={logo} alt="heart with pulse" />
          </div>
          <div className={styles.brand}>
            <div className={styles.pretitle}>Nursing</div>
            <div className={styles.title}>
              Diagnos<span>IC</span>
            </div>
          </div>
        </div>
        <nav>
          <a href="/">Início</a>
          <a className={styles.actived} href="">
            Domínios
          </a>
          <a href="">Sobre</a>
        </nav>
      </div>
    </header>
  )
}

export default Header
