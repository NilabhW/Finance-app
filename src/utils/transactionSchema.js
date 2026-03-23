import * as yup from 'yup'

export const transactionSchema = yup.object({
  title: yup
    .string()
    .min(2, 'Title must be at least 2 characters')
    .max(50, 'Title cannot exceed 50 characters')
    .required('Title is required'),

  amount: yup
    .number()
    .typeError('Amount must be a number')
    .positive('Amount must be greater than zero')
    .max(10000000, 'Amount seems too large')
    .required('Amount is required'),

  category: yup
    .string()
    .oneOf(
      ['Food','Travel','Rent','Shopping',
       'Entertainment','Health','Utilities','Subscriptions','Income'],
      'Please select a valid category'
    )
    .required('Category is required'),

  type: yup
    .string()
    .oneOf(['income', 'expense'], 'Type must be income or expense')
    .required('Type is required'),

  date: yup
    .string()
    .required('Date is required'),

  notes: yup
    .string()
    .max(200, 'Notes cannot exceed 200 characters'),

  recurring: yup
    .boolean()
    .default(false),
})