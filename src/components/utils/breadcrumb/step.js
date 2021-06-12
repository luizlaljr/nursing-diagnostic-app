import React from 'react'
import Link from 'next/link'
import styles from './step.module.scss'

function Step({ on, index, color, path }) {
  return (
    <div className={styles.stepBlock}>
      <div className={on ? styles.circleWrapperOn : styles.circleWrapper}>
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
