import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { BottomNav } from '../components/BottomNav'
import { useIncome } from '../hooks/useIncome'

interface FormValues {
  amount: number
  date: string
  source: string
}

function todayISO() {
  return new Date().toISOString().split('T')[0]
}

export function AddIncome() {
  const navigate = useNavigate()
  const { addIncome, loading, error: saveError } = useIncome()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      date: todayISO(),
      source: '',
    },
  })

  async function onSubmit(data: FormValues) {
    const result = await addIncome({
      amount: data.amount,
      date: data.date,
      source: data.source.trim(),
    })
    if (result) {
      navigate('/income/allocate', {
        state: { incomeId: result.id, amount: data.amount },
      })
    }
  }

  return (
    <div className="app-shell">
      <div className="page-content">

        {/* ── Header ── */}
        <div className="page-header">
          <button
            type="button"
            className="back-btn"
            onClick={() => navigate('/dashboard')}
            aria-label="Back to dashboard"
          >
            <svg
              aria-hidden="true"
              width="16"
              height="16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="page-header-title">Add Income</h1>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>

          {/* ── Amount ── */}
          <div className="card" style={{ marginBottom: '0.75rem' }}>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label htmlFor="amount">Amount</label>
              <div className="amount-input-wrapper">
                <span className="amount-prefix" aria-hidden="true">$</span>
                <input
                  id="amount"
                  type="number"
                  step="0.01"
                  min="0.01"
                  inputMode="decimal"
                  className="input amount-input"
                  placeholder="0.00"
                  aria-invalid={errors.amount ? 'true' : 'false'}
                  aria-describedby={errors.amount ? 'amount-error' : undefined}
                  {...register('amount', {
                    required: 'Amount is required',
                    valueAsNumber: true,
                    validate: v => (v > 0) || 'Amount must be greater than $0',
                  })}
                />
              </div>
              {errors.amount && (
                <p id="amount-error" className="field-error" role="alert">
                  {errors.amount.message}
                </p>
              )}
            </div>
          </div>

          {/* ── Date ── */}
          <div className="card" style={{ marginBottom: '0.75rem' }}>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label htmlFor="date">Date</label>
              <input
                id="date"
                type="date"
                className="input"
                aria-invalid={errors.date ? 'true' : 'false'}
                aria-describedby={errors.date ? 'date-error' : undefined}
                {...register('date', { required: 'Date is required' })}
              />
              {errors.date && (
                <p id="date-error" className="field-error" role="alert">
                  {errors.date.message}
                </p>
              )}
            </div>
          </div>

          {/* ── Source ── */}
          <div className="card" style={{ marginBottom: '1.25rem' }}>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label htmlFor="source">Source</label>
              <input
                id="source"
                type="text"
                className="input"
                placeholder="Job, stipend, freelance…"
                autoComplete="off"
                {...register('source')}
              />
            </div>
          </div>

          {saveError && (
            <p className="field-error" role="alert" style={{ marginBottom: '1rem' }}>
              {saveError}
            </p>
          )}

          <button
            type="submit"
            className="btn btn-primary"
            disabled={loading}
            aria-busy={loading}
          >
            {loading ? 'Saving…' : 'Save Income'}
          </button>

        </form>
      </div>
      <BottomNav />
    </div>
  )
}
