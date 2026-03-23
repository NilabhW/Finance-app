import { formatINR } from '../../utils/currencyFormatter'
import './BudgetCard.css'

export default function BudgetCard({ budget, compact = false }) {
  const { monthlyBudget, spent, remaining, percentage, status, isSet } = budget

  if (!isSet) {
    return (
      <div className="budget-card budget-card--empty">
        <p>No budget set</p>
        <span>Go to the Budget page to set a monthly limit</span>
      </div>
    )
  }

  return (
    <div className={`budget-card ${compact ? 'budget-card--compact' : ''}`}>
      {!compact && (
        <div className="budget-card__header">
          <span className="budget-card__title">Monthly budget</span>
          <span className={`budget-card__status status--${status}`}>
            {status === 'over'    && 'Over budget'}
            {status === 'warning' && 'Nearing limit'}
            {status === 'good'    && 'On track'}
          </span>
        </div>
      )}

      {/* Progress bar */}
      <div className="budget-bar__wrap">
        <div
          className={`budget-bar__fill bar--${status}`}
          style={{ width: `${percentage}%` }}
        />
      </div>

      {/* Numbers */}
      <div className="budget-card__numbers">
        <div className="budget-num">
          <span className="budget-num__label">Spent</span>
          <span className={`budget-num__value ${status === 'over' ? 'val--danger' : ''}`}>
            {formatINR(spent)}
          </span>
        </div>
        <div className="budget-num budget-num--center">
          <span className="budget-num__label">{percentage}% used</span>
          <span className="budget-num__value">of {formatINR(monthlyBudget)}</span>
        </div>
        <div className="budget-num budget-num--right">
          <span className="budget-num__label">
            {remaining >= 0 ? 'Remaining' : 'Over by'}
          </span>
          <span className={`budget-num__value ${remaining < 0 ? 'val--danger' : 'val--good'}`}>
            {formatINR(Math.abs(remaining))}
          </span>
        </div>
      </div>
    </div>
  )
}