import React from 'react'
import Link from 'next/link'
import styles from './styles.module.scss'
import { useAppContext } from '../../../context/context'

function button({ children, click, path, background, color, borderColor }) {
  const { removeAllSymptoms } = useAppContext()

  const emptyList = () => {
    click !== null && click()
    if (path === '/begin') {
      removeAllSymptoms()
    }
  }

  return (
    <Link href={path}>
      <a
        onClick={emptyList}
        className={styles.button}
        style={{ background: background, color: color, borderColor: borderColor }}
      >
        {children}
      </a>
    </Link>
  )
}

export default button
