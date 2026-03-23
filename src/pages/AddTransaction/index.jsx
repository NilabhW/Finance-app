import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { transactionSchema } from '../../utils/transactionSchema'
import { useFinance } from '../../context/FinanceContext'
import './AddTransaction.css'

const CATEGORIES = [
  'Food','Travel','Rent','Shopping',
  'Entertainment','Health','Utilities','Subscriptions','Income',
]

export default function AddTransaction() {
  const { addTransaction } = useFinance()
  const navigate = useNavigate()

  // 1. Initialise the form — connect yup schema as the validator
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(transactionSchema),
    defaultValues: {
      type: 'expense',
      date: new Date().toISOString().split('T')[0],
      recurring: false,
    },
  })

    // Watch the "type" field so we can change UI based on income vs expense
  const transactionType = watch('type')

  // 2. Called only when all validation passes
  function onSubmit(data) {
    addTransaction(data)
    toast.success('Transaction added successfully!')
    reset()
    navigate('/transactions')
  }

  return (
    <div className="page">
      <div className="page-header">
        <h1>Add Transaction</h1>
        <p>Record a new income or expense</p>
      </div>

      <div className="form-card">
        {/* Type toggle — shown at the top so it sets context for the whole form */}
        <div className="type-toggle">
          <button
            type="button"
            className={`toggle-btn ${transactionType === 'expense' ? 'active-expense' : ''}`}
            onClick={() => {
    // Manually set type field value
              document.querySelector('[name="type"][value="expense"]').click()
            }}
          >
            Expense
          </button>
          <button
            type="button"
            className={`toggle-btn ${transactionType === 'income' ? 'active-income' : ''}`}
            onClick={() => {
              document.querySelector('[name="type"][value="income"]').click()
            }}
          >
            Income
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          {/* Hidden radio inputs that react-hook-form tracks */}
          <input type="radio" value="expense" {...register('type')} style={{display:'none'}} />
          <input type="radio" value="income"  {...register('type')} style={{display:'none'}} />

          {/* Title */}
          <div className="field">
            <label htmlFor="title">Title</label>
            <input
              id="title"
              type="text"
              placeholder="e.g. Grocery shopping"
              className={errors.title ? 'input-error' : ''}
              {...register('title')}
            />
   {errors.title && <p className="error-msg">{errors.title.message}</p>}
          </div>

          {/* Amount */}
          <div className="field">
            <label htmlFor="amount">Amount (₹)</label>
            <input
              id="amount"
              type="number"
              placeholder="0"
              min="0"
              className={errors.amount ? 'input-error' : ''}
              {...register('amount')}
            />
            {errors.amount && <p className="error-msg">{errors.amount.message}</p>}
          </div>

          {/* Category */}
          <div className="field">
            <label htmlFor="category">Category</label>
            <select
              id="category"
              className={errors.category ? 'input-error' : ''}
              {...register('category')}
            >
              <option value="">Select a category</option>
              {CATEGORIES.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            {errors.category && <p className="error-msg">{errors.category.message}</p>}
          </div>
 {/* Date */}
          <div className="field">
            <label htmlFor="date">Date</label>
            <input
              id="date"
              type="date"
              className={errors.date ? 'input-error' : ''}
              {...register('date')}
            />
            {errors.date && <p className="error-msg">{errors.date.message}</p>}
          </div>

          {/* Notes */}
          <div className="field">
            <label htmlFor="notes">Notes <span className="optional">(optional)</span></label>
            <textarea
              id="notes"
              placeholder="Any additional details..."
              rows={3}
              {...register('notes')}
            />
            {errors.notes && <p className="error-msg">{errors.notes.message}</p>}
          </div>

          {/* Recurring toggle */}
          <div className="field field--checkbox">
            <input
              id="recurring"
              type="checkbox"
              {...register('recurring')}
            />
            <label htmlFor="recurring">
              Mark as recurring
              <span className="hint">e.g. rent, subscriptions, salary</span>
            </label>
          </div>

          {/* Actions */}
          <div className="form-actions">
            <button
              type="button"
              className="btn-secondary"
              onClick={() => navigate('/transactions')}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`btn-primary ${transactionType === 'income' ? 'btn-income' : 'btn-expense'}`}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Saving...' : 'Save Transaction'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}