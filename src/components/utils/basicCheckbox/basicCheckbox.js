import React, { useEffect, useState } from 'react'
import { useAppContext } from '../../../context/context'
import styles from './styles.module.scss'

function BasicCheckbox({ rule, handleStart }) {
  const { rules, addRules, removeRules } = useAppContext()

  const [checked, setChecked] = useState(true)

  const toggleCheck = () => {
    setChecked(!checked)
    !checked ? addRules(rule.id) : removeRules(rule.id)
  }

  useEffect(() => {
    const setCondition = () => {
      setChecked(rules.has(rule.id))
    }
    setCondition()
  }, [])

  useEffect(() => {
    handleStart()
  }, [checked])

  return (
    <div checked={checked} onClick={toggleCheck} className={styles.checkbox}>
      <input
        type="checkbox"
        className={styles.checkbox}
        defaultChecked={checked}
        onChange={toggleCheck}
      />
      <label htmlFor="chk1">{rule.name}</label>
    </div>
  )
}

export default BasicCheckbox
