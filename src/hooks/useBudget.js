import { useMemo } from 'react'
import { useFinance } from '../context/FinanceContext'

export function useBudget() {
  const { budget, updateBudget, transactions } = useFinance()

  const calculations = useMemo(() => {
    const monthlyBudget = Number(budget.monthlyBudget) || 0

    // Only count current month's expenses toward the budget
    const now = new Date()
    const currentMonthExpenses = transactions.filter(tx => {
      if (tx.type !== 'expense') return false
      const txDate = new Date(tx.date)
      return (
        txDate.getMonth() === now.getMonth() &&
        txDate.getFullYear() === now.getFullYear()
      )
    })

    const spent = currentMonthExpenses.reduce(
      (sum, tx) => sum + Number(tx.amount), 0
    )

    const remaining = monthlyBudget - spent
    const percentage = monthlyBudget > 0
      ? Math.min((spent / monthlyBudget) * 100, 100)
      : 0

    // Spending by category for the breakdown table
    const byCategory = currentMonthExpenses.reduce((acc, tx) => {
      acc[tx.category] = (acc[tx.category] || 0) + Number(tx.amount)
      return acc
    }, {})

    // Colour of the progress bar based on how much is used
    const status =
      percentage >= 100 ? 'over' :
      percentage >= 75  ? 'warning' : 'good'

    return {
      monthlyBudget,
      spent,
      remaining,
      percentage: Math.round(percentage),
      byCategory,
      status,
      isSet: monthlyBudget > 0,
    }
  }, [budget, transactions])

  return { ...calculations, updateBudget }
}