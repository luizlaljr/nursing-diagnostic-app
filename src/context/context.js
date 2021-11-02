import React, { createContext, useState, useContext, useEffect } from 'react'

const Context = createContext()

function useAppContext() {
  return useContext(Context)
}

const ContextProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false)
  const [symptoms, setSymptoms] = useState([])
  const [rules, setRules] = useState(new Set())

  const handleAuth = (username, password) => {
    if (username === process.env.USERNAME && password === process.env.PASSWORD) {
      setAuthenticated(true)
    }
  }

  const addSymptoms = (symptom) => {
    const symptomsList = [...symptoms]
    symptomsList.push(symptom)
    setSymptoms(symptomsList)
  }

  const removeSymptoms = (symptomId) => {
    setSymptoms(symptoms.splice(symptomId, 1))
  }

  const removeAllSymptoms = () => {
    setSymptoms([])
  }

  const addRules = (rule) => {
    setRules((state) => new Set(state.add(rule)))
  }

  const removeRules = (ruleId) => {
    const newRules = [...rules].filter((x) => x !== ruleId)
    setRules(new Set(newRules))
  }

  useEffect(() => {
    setAuthenticated(false)
  }, [])

  return (
    <Context.Provider
      value={{
        symptoms,
        addSymptoms,
        removeSymptoms,
        removeAllSymptoms,
        rules,
        addRules,
        removeRules,
        authenticated,
        handleAuth,
      }}
    >
      {children}
    </Context.Provider>
  )
}

export { useAppContext, ContextProvider }
