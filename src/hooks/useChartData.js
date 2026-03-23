import { useMemo } from 'react'
import { format, subMonths, startOfMonth, endOfMonth, isWithinInterval } from 'date-fns'
import { useFinance } from '../context/FinanceContext'

export function useChartData() {
  const { transactions } = useFinance()

  // ── 1. PIE CHART DATA ──────────────────────────────────────────
  // Shape needed: [{ name: 'Food', value: 4500 }, ...]
  // Only expense transactions, grouped by category
  const pieData = useMemo(() => {
    const expenseOnly = transactions.filter(tx => tx.type === 'expense')

    const grouped = expenseOnly.reduce((acc, tx) => {
      acc[tx.category] = (acc[tx.category] || 0) + Number(tx.amount)
      return acc
    }, {})

    return Object.entries(grouped)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value)  // largest slice first
  }, [transactions])

  // ── 2. LINE CHART DATA ─────────────────────────────────────────
  // Shape needed: [{ month: 'Jan 25', expenses: 8000 }, ...]
  // Last 6 months, expenses only
  const lineData = useMemo(() => {
    const months = Array.from({ length: 6 }, (_, i) => {
      const date = subMonths(new Date(), 5 - i)  // 5 months ago → now
      return {
        month: format(date, 'MMM yy'),
        start: startOfMonth(date),
        end:   endOfMonth(date),
      }
    })

    return months.map(({ month, start, end }) => {
      const expenses = transactions
        .filter(tx =>
          tx.type === 'expense' &&
          isWithinInterval(new Date(tx.date), { start, end })
        )
        .reduce((sum, tx) => sum + Number(tx.amount), 0)

      return { month, expenses }
    })
  }, [transactions])

  // ── 3. BAR CHART DATA ──────────────────────────────────────────
  // Shape needed: [{ month: 'Jan 25', income: 50000, expenses: 12000 }, ...]
  // Last 6 months, both income and expenses
  const barData = useMemo(() => {
    const months = Array.from({ length: 6 }, (_, i) => {
      const date = subMonths(new Date(), 5 - i)
      return {
        month: format(date, 'MMM yy'),
        start: startOfMonth(date),
        end:   endOfMonth(date),
      }
    })

    return months.map(({ month, start, end }) => {
      const inRange = transactions.filter(tx =>
        isWithinInterval(new Date(tx.date), { start, end })
      )

      const income = inRange
        .filter(tx => tx.type === 'income')
        .reduce((sum, tx) => sum + Number(tx.amount), 0)

      const expenses = inRange
        .filter(tx => tx.type === 'expense')
        .reduce((sum, tx) => sum + Number(tx.amount), 0)

      return { month, income, expenses }
    })
  }, [transactions])

  // ── 4. SUMMARY STATS ──────────────────────────────────────────
  const topCategory = useMemo(() => {
    if (pieData.length === 0) return null
    return pieData[0]  // already sorted highest first
  }, [pieData])

  const hasData = transactions.length > 0

  return { pieData, lineData, barData, topCategory, hasData }
}