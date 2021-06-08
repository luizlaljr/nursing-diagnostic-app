import React from 'react'
import Link from 'next/link'
import styles from './step.module.scss'

function Step({ index, color, path }) {
  return (
    <div className={styles.stepBlock}>
      <div className={styles.circleWrapper}>
        <Link href={`${path.toString()}`}>
          <a>
            <div
              className={styles.circle}
              style={{
                background: `${color.backgroundColor}`,
                color: `${color.fontColor}`,
              }}
            >
              {index + 1}
            </div>
          </a>
        </Link>
      </div>
    </div>
  )
}

export default Step
