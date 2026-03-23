import { createContext, useContext, useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'

const FinanceContext = createContext()

// Helper: safely read from localStorage
function loadFromStorage(key, fallback) {
  try {
    const stored = localStorage.getItem(key)
    return stored ? JSON.parse(stored) : fallback
  } catch {
    return fallback
  }
}

export function FinanceProvider({ children }) {
  // Initialise state FROM localStorage instead of empty defaults
  const [transactions, setTransactions] = useState(() =>
    loadFromStorage('finance_transactions', [])
  )
  const [budget, setBudget] = useState(() =>
    loadFromStorage('finance_budget', { monthlyBudget: 0 })
  )

  // Save to localStorage whenever transactions changes
  useEffect(() => {
    localStorage.setItem('finance_transactions', JSON.stringify(transactions))
  }, [transactions])

  // Save to localStorage whenever budget changes
  useEffect(() => {
    localStorage.setItem('finance_budget', JSON.stringify(budget))
  }, [budget])

  function addTransaction(data) {
    const newTransaction = { ...data, id: uuidv4() }
    setTransactions(prev => [newTransaction, ...prev])
  }

  function deleteTransaction(id) {
    setTransactions(prev => prev.filter(tx => tx.id !== id))
  }

  function updateTransaction(id, updatedData) {
    setTransactions(prev =>
      prev.map(tx => (tx.id === id ? { ...tx, ...updatedData } : tx))
    )
  }

  function updateBudget(amount) {
    setBudget({ monthlyBudget: Number(amount) })
  }

  // Dev helper — clear all data (useful during testing)
  function clearAllData() {
    setTransactions([])
    setBudget({ monthlyBudget: 0 })
    localStorage.removeItem('finance_transactions')
    localStorage.removeItem('finance_budget')
  }

  return (
    <FinanceContext.Provider value={{
      transactions,
      addTransaction,
      deleteTransaction,
      updateTransaction,
      budget,
      updateBudget,
      clearAllData,
    }}>
      {children}
    </FinanceContext.Provider>
  )
}

export function useFinance() {
  const context = useContext(FinanceContext)
  if (!context) {
    throw new Error('useFinance must be used inside a FinanceProvider')
  }
  return context
}