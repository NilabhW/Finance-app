import { NavLink } from 'react-router-dom'
import './Layout.css'

const NAV_ITEMS = [
  { to: '/dashboard',        label: 'Dashboard' },
  { to: '/transactions',     label: 'Transactions' },
  { to: '/transactions/new', label: 'Add Transaction' },
  { to: '/budget',           label: 'Budget' },
  { to: '/analytics',        label: 'Analytics' },
]

export default function Layout({ children }) {
  return (
    <div className="layout">
      <nav className="navbar">
        <span className="navbar__brand">Finance App</span>
        <ul className="navbar__links">
          {NAV_ITEMS.map(item => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  isActive ? 'nav-link nav-link--active' : 'nav-link'
                }
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      <main className="main-content">
        {children}
      </main>
    </div>
  )
}