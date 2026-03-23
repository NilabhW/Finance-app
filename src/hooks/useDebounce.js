import { useState, useEffect } from 'react'

export function useDebounce(value, delay = 300) {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    // Set a timer to update the debounced value after `delay` ms
    const timer = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    // If value changes before the timer fires, cancel it and restart
    return () => clearTimeout(timer)
  }, [value, delay])

  return debouncedValue
}