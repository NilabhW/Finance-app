import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer
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
      <p style={{ color: '#dc2626' }}>
        Expenses: {formatINR(payload[0].value)}
      </p>
    </div>
  )
}

export default function SpendingLine({ data }) {
  if (!data || data.length === 0) {
    return <div className="chart-empty">No data yet</div>
  }

  return (
    <ResponsiveContainer width="100%" height={280}>
      <LineChart data={data} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
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
        <Line
          type="monotone"
          dataKey="expenses"
          stroke="#dc2626"
          strokeWidth={2}
          dot={{ r: 4, fill: '#dc2626' }}
          activeDot={{ r: 6 }}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}