import { useState } from 'react'

const useInput = (initialValue = '') => {
  const [value, setValue] = useState(initialValue)

  const handleChange = e => {
    setValue(e.target.value)
  }

  const reset = () => {
    setValue('')
  }

  const setCustomValue = (newValue) => {
    setValue(newValue)
  }

  return { 
    value,
    onChange: handleChange,
    reset,
    setValue: setCustomValue,
    isEmpty: value.length === 0,
    isValid: value.length > 0
  }
}

export default useInput
