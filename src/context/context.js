import React, { createContext, useState, useContext } from 'react'

const Context = createContext()

function useAppContext() {
  return useContext(Context)
}

const ContextProvider = ({ children }) => {
  const [symptoms, setSymptoms] = useState([])

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

  return (
    <Context.Provider
      value={{
        symptoms,
        addSymptoms,
        removeSymptoms,
        removeAllSymptoms,
      }}
    >
      {children}
    </Context.Provider>
  )
}

export { useAppContext, ContextProvider }
