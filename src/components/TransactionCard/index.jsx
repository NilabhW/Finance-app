import { toast } from 'react-toastify'
import { useFinance } from '../../context/FinanceContext'
import { formatINR } from '../../utils/currencyFormatter'
import './TransactionCard.css'

// Map categories to a short emoji for quick scanning
const CATEGORY_ICONS = {
  Food: '🍔', Travel: '✈️', Rent: '🏠', Shopping: '🛍️',
  Entertainment: '🎬', Health: '💊', Utilities: '⚡',
  Subscriptions: '📱', Income: '💼',
}

export default function TransactionCard({ transaction }) {
  const { deleteTransaction } = useFinance()
  const { id, title, amount, category, type, date, notes, recurring } = transaction

  function handleDelete() {
    // Simple confirmation before deleting — good UX habit
    if (window.confirm(`Delete "${title}"?`)) {
      deleteTransaction(id)
      toast.info('Transaction deleted')
    }
  }

  // Format the date for display
  const formattedDate = new Date(date).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })

  const isIncome = type === 'income'

  return (
    <div className={`tx-card ${isIncome ? 'tx-card--income' : 'tx-card--expense'}`}>
      {/* Left: icon + info */}
      <div className="tx-card__left">
        <span className="tx-card__icon">
          {CATEGORY_ICONS[category] || '💰'}
        </span>
        <div className="tx-card__info">
          <div className="tx-card__title">
            {title}
            {recurring && <span className="recurring-badge">Recurring</span>}
          </div>
          <div className="tx-card__meta">
            <span className="tx-card__category">{category}</span>
            <span className="tx-card__dot">·</span>
            <span className="tx-card__date">{formattedDate}</span>
          </div>
          {notes && <div className="tx-card__notes">{notes}</div>}
        </div>
      </div>

      {/* Right: amount + delete */}
      <div className="tx-card__right">
        <span className={`tx-card__amount ${isIncome ? 'amount--income' : 'amount--expense'}`}>
          {isIncome ? '+' : '-'}{formatINR(amount)}
        </span>
        <button
          className="tx-card__delete"
          onClick={handleDelete}
          aria-label={`Delete ${title}`}
        >
          ✕
        </button>
      </div>
    </div>
  )
}