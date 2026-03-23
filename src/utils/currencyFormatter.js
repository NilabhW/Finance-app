// Format numbers as Indian Rupee currency
export function formatINR(amount) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount)
}

// Format as plain number with commas
export function formatNumber(amount) {
  return new Intl.NumberFormat('en-IN').format(amount)
}