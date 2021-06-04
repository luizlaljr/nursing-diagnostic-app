import React, { useState } from 'react'

import styles from './styles.module.scss'

function Checkbox({ domain }) {
  const [checked, setChecked] = useState(false)

  return (
    <div
      checked={checked}
      onClick={() => setChecked(!checked)}
      className={styles.checkbox}
    >
      <input
        type="checkbox"
        className={styles.checkbox}
        checked={checked}
        onChange={() => setChecked(!checked)}
      />
      <label htmlFor="chk1">{domain.name}</label>
    </div>
  )
}

export default Checkbox
