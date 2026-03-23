import { useMemo } from 'react'
import { useFinance } from '../context/FinanceContext'

export function useTransactions() {
  const { transactions, addTransaction, deleteTransaction, updateTransaction } = useFinance()

  // useMemo means these only recalculate when transactions changes
  // not on every single render
  const totals = useMemo(() => {
    const income = transactions
      .filter(tx => tx.type === 'income')
      .reduce((sum, tx) => sum + Number(tx.amount), 0)

    const expenses = transactions
      .filter(tx => tx.type === 'expense')
      .reduce((sum, tx) => sum + Number(tx.amount), 0)

    return {
      income,
      expenses,
      net: income - expenses,
    }
  }, [transactions])

  const recurringTransactions = useMemo(
    () => transactions.filter(tx => tx.recurring),
    [transactions]
  )

  return {
    transactions,
    totals,
    recurringTransactions,
    addTransaction,
    deleteTransaction,
    updateTransaction,
  }
}