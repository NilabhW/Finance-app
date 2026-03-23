import axios from 'axios'

const BASE_URL = 'https://api.exchangerate-api.com/v4/latest'

// Fetch all exchange rates relative to INR
// Returns an object like { USD: 0.012, EUR: 0.011, GBP: 0.0095, ... }
export async function fetchExchangeRates(baseCurrency = 'INR') {
  try {
    const response = await axios.get(`${BASE_URL}/${baseCurrency}`)
    return response.data.rates
  } catch (error) {
    console.error('Failed to fetch exchange rates:', error.message)
    // Return null so the hook can handle the failure gracefully
    return null
  }
}