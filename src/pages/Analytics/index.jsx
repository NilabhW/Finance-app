import { useChartData } from '../../hooks/useChartData'
import { useTransactions } from '../../hooks/useTransactions'
import SpendingPie from '../../components/Charts/spendingPie.jsx'
import SpendingLine from '../../components/Charts/SpendingLine'
import IncomeExpenseBar from '../../components/Charts/IncomeExpenseBar'
import { formatINR } from '../../utils/currencyFormatter'
import PageTransition from '../../components/PageTransition'
import './Analytics.css'

export default function Analytics() {
  const { pieData, lineData, barData, topCategory, hasData } = useChartData()
  const { totals, transactions } = useTransactions()

  if (!hasData) {
    return (
      <PageTransition>
        <div className="page">
          <div className="analytics-header">
            <h1>Analytics</h1>
            <p>Add transactions to see your financial insights</p>
          </div>
          <div className="analytics-empty">
            <div style={{ fontSize: 48, marginBottom: 16 }}>📊</div>
            <h3>No data to display yet</h3>
            <p>Start adding transactions to unlock your analytics dashboard</p>
          </div>
        </div>
      </PageTransition>
    )
  }

  return (
    <PageTransition>
      <div className="page">
        <div className="analytics-header">
          <h1>Analytics</h1>
          <p>Your financial insights at a glance</p>
        </div>

        {/* Summary stats row */}
        <div className="analytics-stats">
          <div className="stat-card">
            <span className="stat-label">Total income</span>
            <span className="stat-value income">{formatINR(totals.income)}</span>
          </div>
          <div className="stat-card">
            <span className="stat-label">Total expenses</span>
            <span className="stat-value expense">{formatINR(totals.expenses)}</span>
          </div>
          <div className="stat-card">
            <span className="stat-label">Net balance</span>
            <span className={`stat-value ${totals.net >= 0 ? 'income' : 'expense'}`}>
              {formatINR(totals.net)}
            </span>
          </div>
          <div className="stat-card">
            <span className="stat-label">Top category</span>
            <span className="stat-value">
              {topCategory ? topCategory.name : '—'}
            </span>
          </div>
          <div className="stat-card">
            <span className="stat-label">Transactions</span>
            <span className="stat-value">{transactions.length}</span>
          </div>
        </div>

        {/* Charts grid */}
        <div className="charts-grid">

          <div className="chart-card chart-card--wide">
            <div className="chart-card__header">
              <h2>Income vs expenses</h2>
              <p>Last 6 months comparison</p>
            </div>
            <IncomeExpenseBar data={barData} />
          </div>

          <div className="chart-card chart-card--wide">
            <div className="chart-card__header">
              <h2>Spending trend</h2>
              <p>Monthly expenses over last 6 months</p>
            </div>
            <SpendingLine data={lineData} />
          </div>

          <div className="chart-card">
            <div className="chart-card__header">
              <h2>Spending by category</h2>
              <p>All-time expense breakdown</p>
            </div>
            <SpendingPie data={pieData} />
          </div>

        </div>
      </div>
    </PageTransition>
  )
}