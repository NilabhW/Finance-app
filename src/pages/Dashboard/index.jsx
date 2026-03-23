import { Link } from 'react-router-dom'
import { useTransactions } from '../../hooks/useTransactions'
import { useBudget } from '../../hooks/useBudget'
import BudgetCard from '../../components/BudgetCard'
import TransactionCard from '../../components/TransactionCard'
import { formatINR } from '../../utils/currencyFormatter'
import './Dashboard.css'

export default function Dashboard() {
  const { transactions, totals } = useTransactions()
  const budget = useBudget()

  // Show only the 5 most recent transactions
  const recentTransactions = transactions.slice(0, 5)

  return (
    <div className="page">
      <div className="dash-header">
        <h1>Dashboard</h1>
        <p>Your financial overview</p>
      </div>

      {/* Summary cards */}
      <div className="dash-cards">
        <div className="dash-card dash-card--income">
          <span className="dash-card__label">Total Income</span>
          <span className="dash-card__value">{formatINR(totals.income)}</span>
        </div>
        <div className="dash-card dash-card--expense">
          <span className="dash-card__label">Total Expenses</span>
          <span className="dash-card__value">{formatINR(totals.expenses)}</span>
        </div>
        <div className={`dash-card ${totals.net >= 0 ? 'dash-card--income' : 'dash-card--expense'}`}>
          <span className="dash-card__label">Net Balance</span>
          <span className="dash-card__value">{formatINR(totals.net)}</span>
        </div>
        <div className="dash-card">
          <span className="dash-card__label">Transactions</span>
          <span className="dash-card__value">{transactions.length}</span>
        </div>
      </div>

      {/* Budget widget */}
      <div className="dash-section" style={{ marginBottom: '24px' }}>
        <div className="dash-section-header">
          <h2>Budget</h2>
          <Link to="/budget">Manage →</Link>
        </div>
        <BudgetCard budget={budget} compact />
      </div>

      {/* Recent transactions */}
      <div className="dash-section">
        <div className="dash-section-header">
          <h2>Recent transactions</h2>
          <Link to="/transactions">View all →</Link>
        </div>

        {recentTransactions.length === 0 ? (
          <div className="dash-empty">
            <p>No transactions yet.</p>
            <Link to="/transactions/new" className="btn-add-small">
              Add your first
            </Link>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {recentTransactions.map(tx => (
              <TransactionCard key={tx.id} transaction={tx} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}