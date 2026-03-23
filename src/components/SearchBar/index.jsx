import './SearchBar.css'

export default function SearchBar({ value, onChange }) {
  return (
    <div className="searchbar">
      <span className="searchbar__icon">🔍</span>
      <input
        type="text"
        className="searchbar__input"
        placeholder="Search by title or notes..."
        value={value}
        onChange={e => onChange(e.target.value)}
      />
      {value && (
        <button className="searchbar__clear" onClick={() => onChange('')}>
          ✕
        </button>
      )}
    </div>
  )
}
