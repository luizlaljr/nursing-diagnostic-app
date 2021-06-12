import React from 'react'
import Step from './step'
import styles from './stepNavigation.module.scss'

function Breadcrumb({ domains, currentyID }) {
  const handleColor = (id) => {
    let color
    if (id < currentyID) {
      color = { backgroundColor: '#FFF', fontColor: '#C1090A' }
    }
    if (id === currentyID) {
      color = { backgroundColor: '#E31722', fontColor: '#FFF' }
    }
    if (id > currentyID) {
      color = { backgroundColor: '#FFF', fontColor: '#bbb' }
    }
    return color
  }

  return (
    <div className={styles.stepWrapper}>
      {domains.map((item, index) => (
        <Step
          on={index + 1 < currentyID}
          key={index}
          index={index}
          path={index + 1}
          color={handleColor(index + 1)}
        />
      ))}
    </div>
  )
}

export default Breadcrumb
