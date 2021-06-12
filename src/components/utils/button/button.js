import React from 'react'
import Link from 'next/link'
import styles from './styles.module.scss'
import { useAppContext } from '../../../context/context'

function button({ children, click, path, background, color }) {
  const { removeAllSymptoms } = useAppContext()

  const emptyList = () => {
    click !== null && click()
    if (path === '/') {
      removeAllSymptoms()
    }
  }

  return (
    <Link href={path}>
      <a
        onClick={emptyList}
        className={styles.button}
        style={{ background: background, color: color }}
      >
        {children}
      </a>
    </Link>
  )
}

export default button
