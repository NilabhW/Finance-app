import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { useBudget } from '../../hooks/useBudget'
import BudgetCard from '../../components/BudgetCard'
import { formatINR } from '../../utils/currencyFormatter'
import PageTransition from '../../components/PageTransition'
import './Budget.css'

export default function Budget() {
  const budget = useBudget()
  const { monthlyBudget, byCategory, status, updateBudget, isSet } = budget

  // Local input state — pre-fill with existing budget if one is set
  const [inputValue, setInputValue] = useState(
    monthlyBudget > 0 ? String(monthlyBudget) : ''
  )

  // Fire a warning toast when spending crosses 100%
  useEffect(() => {
    if (status === 'over' && isSet) {
      toast.warn('You have exceeded your monthly budget!')
    }
  }, [status, isSet])

  function handleSave() {
    const amount = Number(inputValue)
    if (!inputValue || isNaN(amount) || amount <= 0) {
      toast.error('Please enter a valid budget amount')
      return
    }
    updateBudget(amount)
    toast.success(`Monthly budget set to ${formatINR(amount)}`)
  }

  // Sort categories by amount spent (highest first)
  const categoryEntries = Object.entries(byCategory)
    .sort(([, a], [, b]) => b - a)

  return (
    <PageTransition>
      <div className="page">
        <div className="budget-page-header">
          <h1>Budget</h1>
          <p>Track your monthly spending against your budget</p>
        </div>

        {/* Set budget form */}
        <div className="budget-set-card">
          <label className="budget-set-label">
            Monthly budget (₹)
          </label>
          <div className="budget-set-row">
            <input
              type="number"
              className="budget-set-input"
              placeholder="e.g. 50000"
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
              min="1"
            />
            <button className="budget-save-btn" onClick={handleSave}>
              {isSet ? 'Update budget' : 'Set budget'}
            </button>
          </div>
        </div>

        {/* Progress card */}
        <BudgetCard budget={budget} />

        {/* Category breakdown */}
        {categoryEntries.length > 0 && (
          <div className="category-breakdown">
            <h2>This month by category</h2>
            <div className="breakdown-list">
              {categoryEntries.map(([category, amount]) => {
                const pct = monthlyBudget > 0
                  ? Math.min((amount / monthlyBudget) * 100, 100)
                  : 0
                return (
                  <div key={category} className="breakdown-item">
                    <div className="breakdown-item__top">
                      <span className="breakdown-item__name">{category}</span>
                      <span className="breakdown-item__amount">{formatINR(amount)}</span>
                    </div>
                    <div className="breakdown-bar__wrap">
                      <div
                        className="breakdown-bar__fill"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <span className="breakdown-item__pct">
                      {pct.toFixed(1)}% of budget
                    </span>
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </PageTransition>
  )
}