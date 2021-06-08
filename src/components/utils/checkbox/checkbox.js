import React, { useEffect, useState } from 'react'
import { useAppContext } from '../../../context/context'
import styles from './styles.module.scss'

function Checkbox({ symptom }) {
  const { symptoms, addSymptoms, removeSymptoms } = useAppContext()

  const [checked, setChecked] = useState()

  const toggleCheck = () => {
    setChecked(!checked)
    !checked ? addSymptoms(symptom.id) : removeSymptoms(symptom.id)
  }

  useEffect(() => {
    const setCondition = () => {
      setChecked(!(symptoms.indexOf(symptom.id) === -1))
    }
    setCondition()
  }, [])

  return (
    <div checked={checked} onClick={toggleCheck} className={styles.checkbox}>
      <input
        type="checkbox"
        className={styles.checkbox}
        defaultChecked={checked}
        onChange={toggleCheck}
      />
      <label htmlFor="chk1">{symptom.name}</label>
    </div>
  )
}

export default Checkbox
