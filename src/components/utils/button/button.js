import React from 'react'
import Link from 'next/link'
import styles from './styles.module.scss'

function button({ children, path, background, color }) {
  return (
    <Link href={path}>
      <a className={styles.button} style={{ background: background, color: color }}>
        {children}
      </a>
    </Link>
  )
}

export default button
