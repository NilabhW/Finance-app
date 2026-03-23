import { useState, useMemo } from 'react'
import { useFinance } from '../context/FinanceContext'
import { useDebounce } from './useDebounce'

export function useFilterSort() {
  const { transactions } = useFinance()

  // --- All filter / sort state in one place ---
  const [searchQuery, setSearchQuery]     = useState('')
  const [filterCategory, setFilterCategory] = useState('')
  const [filterType, setFilterType]       = useState('')
  const [dateFrom, setDateFrom]           = useState('')
  const [dateTo, setDateTo]               = useState('')
  const [sortBy, setSortBy]               = useState('date-desc')

  // Debounce the search so we don't filter on every keystroke
  const debouncedSearch = useDebounce(searchQuery, 300)

  // --- The filtered + sorted list ---
  const processedTransactions = useMemo(() => {
    let result = [...transactions]

    // 1. Search — matches title or notes (case-insensitive)
    if (debouncedSearch.trim()) {
      const q = debouncedSearch.toLowerCase()
      result = result.filter(tx =>
        tx.title.toLowerCase().includes(q) ||
        (tx.notes && tx.notes.toLowerCase().includes(q))
      )
    }
    // 2. Category filter
    if (filterCategory) {
      result = result.filter(tx => tx.category === filterCategory)
    }

    // 3. Type filter (income / expense)
    if (filterType) {
      result = result.filter(tx => tx.type === filterType)
    }

    // 4. Date range
    if (dateFrom) {
      result = result.filter(tx => new Date(tx.date) >= new Date(dateFrom))
    }
    if (dateTo) {
      result = result.filter(tx => new Date(tx.date) <= new Date(dateTo))
    }

    // 5. Sort
    result.sort((a, b) => {
      switch (sortBy) {
        case 'date-desc':   return new Date(b.date) - new Date(a.date)
        case 'date-asc':    return new Date(a.date) - new Date(b.date)
        case 'amount-desc': return Number(b.amount) - Number(a.amount)
        case 'amount-asc':  return Number(a.amount) - Number(b.amount)
        case 'category':    return a.category.localeCompare(b.category)
        default:            return 0
      }
    })

    return result
  }, [transactions, debouncedSearch, filterCategory, filterType, dateFrom, dateTo, sortBy])

  // Count how many filters are currently active (for the badge)
  const activeFilterCount = [
    debouncedSearch, filterCategory, filterType, dateFrom, dateTo
  ].filter(Boolean).length

  // Reset everything back to defaults
  function clearAll() {
    setSearchQuery('')
    setFilterCategory('')
    setFilterType('')
    setDateFrom('')
    setDateTo('')
    setSortBy('date-desc')
  }

   return {
    // State + setters (for the UI components)
    searchQuery, setSearchQuery,
    filterCategory, setFilterCategory,
    filterType, setFilterType,
    dateFrom, setDateFrom,
    dateTo, setDateTo,
    sortBy, setSortBy,
    // Derived values
    processedTransactions,
    activeFilterCount,
    clearAll,
  }
}