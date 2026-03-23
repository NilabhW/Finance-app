import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer
} from 'recharts'
import { formatINR } from '../../utils/currencyFormatter'

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null
  return (
    <div style={{
      background: '#fff', border: '1px solid #e5e7eb',
      borderRadius: 8, padding: '8px 12px', fontSize: 13,
    }}>
      <p style={{ fontWeight: 500, color: '#1a1a1a', marginBottom: 4 }}>{label}</p>
      {payload.map(p => (
        <p key={p.dataKey} style={{ color: p.fill, marginBottom: 2 }}>
          {p.dataKey === 'income' ? 'Income' : 'Expenses'}: {formatINR(p.value)}
        </p>
      ))}
    </div>
  )
}

export default function IncomeExpenseBar({ data }) {
  if (!data || data.length === 0) {
    return <div className="chart-empty">No data yet</div>
  }

  return (
    <ResponsiveContainer width="100%" height={280}>
      <BarChart data={data} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
        <XAxis
          dataKey="month"
          tick={{ fontSize: 12, fill: '#9ca3af' }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          tick={{ fontSize: 12, fill: '#9ca3af' }}
          axisLine={false}
          tickLine={false}
          tickFormatter={v => `₹${(v/1000).toFixed(0)}k`}
        />
        <Tooltip content={<CustomTooltip />} />
        <Legend
          formatter={value => value === 'income' ? 'Income' : 'Expenses'}
        />
        <Bar dataKey="income"   fill="#16a34a" radius={[4,4,0,0]} />
        <Bar dataKey="expenses" fill="#dc2626" radius={[4,4,0,0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}