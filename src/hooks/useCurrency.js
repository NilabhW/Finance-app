import { useState, useEffect, useCallback } from 'react'
import { fetchExchangeRates } from '../services/api'

export function useCurrency() {
  const [rates, setRates] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function loadRates() {
      setLoading(true)
      const data = await fetchExchangeRates('INR')
      if (data) {
        setRates(data)
      } else {
        setError('Could not load exchange rates')
      }
      setLoading(false)
    }

    loadRates()
  }, []) // Empty array — fetch once on mount, never again

  // Convert an INR amount to the target currency
  const convert = useCallback((amountINR, toCurrency) => {
    if (!rates || !rates[toCurrency]) return null
    return amountINR * rates[toCurrency]
  }, [rates])

  // List of popular currencies to show in the dropdown
  const popularCurrencies = ['USD', 'EUR', 'GBP', 'AED', 'SGD', 'JPY', 'AUD']

  return { rates, loading, error, convert, popularCurrencies }
}