import { createContext, useContext, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

// 1. Create the context object
const FinanceContext = createContext()

// 2. The Provider component — wraps the whole app
export function FinanceProvider({ children }) {
  const [transactions, setTransactions] = useState([])
  const [budget, setBudget] = useState({ monthlyBudget: 0 })

  // Add a new transaction to the top of the list
  function addTransaction(data) {
    const newTransaction = {
      ...data,
      id: uuidv4(),
    }
    setTransactions(prev => [newTransaction, ...prev])
  }

  // Remove a transaction by its ID
  function deleteTransaction(id) {
    setTransactions(prev => prev.filter(tx => tx.id !== id))
  }

  // Update a specific transaction — merges new data into old
  function updateTransaction(id, updatedData) {
    setTransactions(prev =>
      prev.map(tx => (tx.id === id ? { ...tx, ...updatedData } : tx))
    )
  }

  // Set or update the monthly budget amount
  function updateBudget(amount) {
    setBudget({ monthlyBudget: Number(amount) })
  }

  // 3. Everything in this value object is accessible app-wide
  const contextValue = {
    transactions,
    addTransaction,
    deleteTransaction,
    updateTransaction,
    budget,
    updateBudget,
  }

  return (
    <FinanceContext.Provider value={contextValue}>
      {children}
    </FinanceContext.Provider>
  )
}

// 4. Custom hook — components import this, not FinanceContext directly
export function useFinance() {
  const context = useContext(FinanceContext)
  if (!context) {
    throw new Error('useFinance must be used inside a FinanceProvider')
  }
  return context
}