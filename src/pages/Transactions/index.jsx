import { Link } from 'react-router-dom'
import { useFilterSort } from '../../hooks/useFilterSort'
import { useTransactions } from '../../hooks/useTransactions'
import TransactionCard from '../../components/TransactionCard'
import SearchBar from '../../components/SearchBar'
import Filters from '../../components/Filters'
import { formatINR } from '../../utils/currencyFormatter'
import './Transactions.css'

export default function Transactions() {
  // Raw totals always computed from ALL transactions (not filtered)
  const { totals, transactions } = useTransactions()

  // Filtered + sorted list
  const {
    searchQuery, setSearchQuery,
    filterCategory, setFilterCategory,
    filterType, setFilterType,
    dateFrom, setDateFrom,
    dateTo, setDateTo,
    sortBy, setSortBy,
    processedTransactions,
    activeFilterCount,
    clearAll,
  } = useFilterSort()

  const isFiltered = activeFilterCount > 0 || searchQuery.trim() !== ''

  return (
    <div className="page">

      {/* Header */}
      <div className="tx-page-header">
        <div>
          <h1>Transactions</h1>
          <p>
            {isFiltered
              ? `${processedTransactions.length} of ${transactions.length} transactions`
              : `${transactions.length} transaction${transactions.length !== 1 ? 's' : ''}`
            }
          </p>
        </div>
        <Link to="/transactions/new" className="btn-add">+ Add Transaction</Link>
      </div>

      {/* Summary bar — always shows totals for ALL transactions */}
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

      {/* Search */}
      <SearchBar value={searchQuery} onChange={setSearchQuery} />

      {/* Filters */}
      <div style={{ marginTop: '10px' }}>
        <Filters
          filterCategory={filterCategory} setFilterCategory={setFilterCategory}
          filterType={filterType}         setFilterType={setFilterType}
          dateFrom={dateFrom}             setDateFrom={setDateFrom}
          dateTo={dateTo}                 setDateTo={setDateTo}
          sortBy={sortBy}                 setSortBy={setSortBy}
          activeFilterCount={activeFilterCount}
          clearAll={clearAll}
        />
      </div>

      {/* List */}
      {processedTransactions.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">{isFiltered ? '🔍' : '📭'}</div>
          <h3>{isFiltered ? 'No matching transactions' : 'No transactions yet'}</h3>
          <p>
            {isFiltered
              ? 'Try adjusting your search or filters'
              : 'Add your first income or expense to get started'}
          </p>
          {isFiltered
            ? <button className="btn-add" onClick={clearAll}>Clear filters</button>
            : <Link to="/transactions/new" className="btn-add">+ Add your first transaction</Link>
          }
        </div>
      ) : (
        <div className="tx-list" style={{ marginTop: '12px' }}>
          {processedTransactions.map(tx => (
            <TransactionCard key={tx.id} transaction={tx} />
          ))}
        </div>
      )}

    </div>
  )
}