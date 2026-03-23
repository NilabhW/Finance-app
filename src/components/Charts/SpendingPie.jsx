import {
  PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer
} from 'recharts'
import { formatINR } from '../../utils/currencyFormatter'

// One colour per category — consistent across all charts
const COLORS = [
  '#2563eb','#16a34a','#dc2626','#d97706',
  '#9333ea','#0891b2','#db2777','#65a30d','#ea580c',
]

// Custom tooltip shown on hover
function CustomTooltip({ active, payload }) {
  if (!active || !payload?.length) return null
  const { name, value } = payload[0]
  return (
    <div style={{
      background: '#fff', border: '1px solid #e5e7eb',
      borderRadius: 8, padding: '8px 12px', fontSize: 13,
    }}>
      <p style={{ fontWeight: 500, color: '#1a1a1a' }}>{name}</p>
      <p style={{ color: '#6b7280' }}>{formatINR(value)}</p>
    </div>
  )
}

export default function SpendingPie({ data }) {
  if (!data || data.length === 0) {
    return <div className="chart-empty">No expense data yet</div>
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          outerRadius={100}
          dataKey="value"
          label={({ name, percent }) =>
            `${name} ${(percent * 100).toFixed(0)}%`
          }
          labelLine={false}
        >
          {data.map((_, index) => (
            <Cell key={index} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  )
}