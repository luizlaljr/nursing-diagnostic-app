import React from 'react'

import styles from './styles.module.scss'

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.copyrigth}>Copyrigth &#169; 2021.</div>
      <div className={styles.dev}>Desenvolvido por alunos de SI-UFF.</div>
    </footer>
  )
}

export default Footer
