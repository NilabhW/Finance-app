import './Filters.css'

const CATEGORIES = [
  'Food','Travel','Rent','Shopping',
  'Entertainment','Health','Utilities','Subscriptions','Income',
]

export default function Filters({
  filterCategory, setFilterCategory,
  filterType, setFilterType,
  dateFrom, setDateFrom,
  dateTo, setDateTo,
  sortBy, setSortBy,
  activeFilterCount,
  clearAll,
}) {
  return (
    <div className="filters">
      <div className="filters__row">

        {/* Category */}
        <select
          className="filter-select"
          value={filterCategory}
          onChange={e => setFilterCategory(e.target.value)}
        >
          <option value="">All categories</option>
          {CATEGORIES.map(c => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>

        {/* Type */}
        <select
          className="filter-select"
          value={filterType}
          onChange={e => setFilterType(e.target.value)}
        >
          <option value="">All types</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>

        {/* Date from */}
        <input
          type="date"
          className="filter-select"
          value={dateFrom}
          onChange={e => setDateFrom(e.target.value)}
          title="From date"
        />

        {/* Date to */}
        <input
          type="date"
          className="filter-select"
          value={dateTo}
          onChange={e => setDateTo(e.target.value)}
          title="To date"
        />

        {/* Sort */}
        <select
          className="filter-select"
          value={sortBy}
          onChange={e => setSortBy(e.target.value)}
        >
          <option value="date-desc">Newest first</option>
          <option value="date-asc">Oldest first</option>
          <option value="amount-desc">Highest amount</option>
          <option value="amount-asc">Lowest amount</option>
          <option value="category">Category A–Z</option>
        </select>

      </div>

      {/* Active filter badge + clear button */}
      {activeFilterCount > 0 && (
        <div className="filters__active">
          <span className="filters__badge">
            {activeFilterCount} filter{activeFilterCount > 1 ? 's' : ''} active
          </span>
          <button className="filters__clear" onClick={clearAll}>
            Clear all
          </button>
        </div>
      )}
    </div>
  )
}