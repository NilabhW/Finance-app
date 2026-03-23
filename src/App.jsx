import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import Transactions from './pages/Transactions'
import AddTransaction from './pages/AddTransaction'
import Budget from './pages/Budget'
import Analytics from './pages/Analytics'

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          {/* Redirect root "/" to "/dashboard" automatically */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />

          <Route path="/dashboard"        element={<Dashboard />} />
          <Route path="/transactions"     element={<Transactions />} />
          <Route path="/transactions/new" element={<AddTransaction />} />
          <Route path="/budget"           element={<Budget />} />
          <Route path="/analytics"        element={<Analytics />} />

          {/* Catch-all: unknown routes go to dashboard */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}
