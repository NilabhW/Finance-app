import { Link } from 'react-router-dom'
import { useTransactions } from '../../hooks/useTransactions'
import TransactionCard from '../../components/TransactionCard'
import { formatINR } from '../../utils/currencyFormatter'
import './Transactions.css'

export default function Transactions() {
  const { transactions, totals } = useTransactions()

  return (
    <div className="page">
      {/* Header */}
      <div className="tx-page-header">
        <div>
          <h1>Transactions</h1>
          <p>{transactions.length} transaction{transactions.length !== 1 ? 's' : ''}</p>
        </div>
        <Link to="/transactions/new" className="btn-add">
          + Add Transaction
        </Link>
      </div>

      {/* Summary bar */}
      {transactions.length > 0 && (
        <div className="tx-summary">
          <div className="summary-item">
            <span className="summary-label">Total income</span>
            <span className="summary-value income">+{formatINR(totals.income)}</span>
          </div>
          <div className="summary-item">
            <span className="summary-label">Total expenses</span>
            <span className="summary-value expense">-{formatINR(totals.expenses)}</span>
          </div>
          <div className="summary-item">
            <span className="summary-label">Net balance</span>
            <span className={`summary-value ${totals.net >= 0 ? 'income' : 'expense'}`}>
              {formatINR(totals.net)}
            </span>
          </div>
        </div>
      )}

      {/* List or empty state */}
      {transactions.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">📭</div>
          <h3>No transactions yet</h3>
          <p>Add your first income or expense to get started</p>
          <Link to="/transactions/new" className="btn-add">
            + Add your first transaction
          </Link>
        </div>
      ) : (
        <div className="tx-list">
          {transactions.map(tx => (
            <TransactionCard key={tx.id} transaction={tx} />
          ))}
        </div>
      )}
    </div>
  )
}