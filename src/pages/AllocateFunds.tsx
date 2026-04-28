import { Navigate, useNavigate, useLocation } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { BottomNav } from '../components/BottomNav'
import { useAllocations } from '../hooks/useAllocations'

const fmt = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })

interface FormValues {
  needs: number
  wants: number
  savings: number
  investments: number
}

interface RouteState {
  incomeId: string
  amount: number
}

const FIELDS = [
  {
    key: 'needs' as const,
    label: 'Needs',
    accent: 'alloc-accent-needs',
    labelClass: 'alloc-label-needs',
    placeholder: '50%',
  },
  {
    key: 'wants' as const,
    label: 'Wants',
    accent: 'alloc-accent-wants',
    labelClass: 'alloc-label-wants',
    placeholder: '30%',
  },
  {
    key: 'savings' as const,
    label: 'Savings',
    accent: 'alloc-accent-savings',
    labelClass: 'alloc-label-savings',
    placeholder: '15%',
  },
  {
    key: 'investments' as const,
    label: 'Investments',
    accent: 'alloc-accent-investments',
    labelClass: 'alloc-label-investments',
    placeholder: '5%',
  },
]

export function AllocateFunds() {
  const navigate = useNavigate()
  const location = useLocation()
  const routeState = location.state as RouteState | null

  const { saveAllocation, loading, error: saveError } = useAllocations()

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>()

  // Must be after hooks
  if (!routeState?.incomeId || !routeState?.amount) {
    return <Navigate to="/income/add" replace />
  }

  const { incomeId, amount } = routeState

  const watched = watch(['needs', 'wants', 'savings', 'investments'])
  const allocated = watched.reduce<number>(
    (sum, v) => sum + (isNaN(Number(v)) ? 0 : Number(v) || 0),
    0
  )
  const remaining = Math.round((amount - allocated) * 100) / 100

  const isFullyAllocated = remaining === 0
  const isOver = remaining < 0

  async function onSubmit(data: FormValues) {
    const ok = await saveAllocation({
      income_entry_id: incomeId,
      needs: data.needs || 0,
      wants: data.wants || 0,
      savings: data.savings || 0,
      investments: data.investments || 0,
    })
    if (ok) navigate('/dashboard')
  }

  return (
    <div className="app-shell">
      <div className="page-content">

        {/* ── Header ── */}
        <div className="page-header">
          <button
            type="button"
            className="back-btn"
            onClick={() => navigate('/income/add')}
            aria-label="Back to add income"
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
          <h1 className="page-header-title">Allocate Funds</h1>
        </div>

        {/* ── Income banner ── */}
        <div className="allocate-banner">
          <p className="allocate-banner-label">Splitting</p>
          <p className="allocate-banner-amount">{fmt.format(amount)}</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>

          {/* ── Four category fields ── */}
          <div className="alloc-fields">
            {FIELDS.map(({ key, label, accent, labelClass, placeholder }) => (
              <div key={key} className="alloc-field-card">
                <div className={`alloc-accent ${accent}`} aria-hidden="true" />
                <div className="alloc-field-content">
                  <label htmlFor={key} className={labelClass}>
                    {label}
                  </label>
                  <input
                    id={key}
                    type="number"
                    step="0.01"
                    min="0"
                    inputMode="decimal"
                    className="input"
                    placeholder={placeholder}
                    aria-invalid={errors[key] ? 'true' : 'false'}
                    aria-describedby={errors[key] ? `${key}-error` : undefined}
                    {...register(key, {
                      valueAsNumber: true,
                      min: { value: 0, message: 'Cannot be negative' },
                    })}
                  />
                  {errors[key] && (
                    <p id={`${key}-error`} className="field-error" role="alert">
                      {errors[key]?.message}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* ── Remaining indicator ── */}
          <div className="alloc-remaining" aria-live="polite">
            <span className="alloc-remaining-label">Remaining</span>
            <div className="alloc-remaining-right">
              <span
                className={`alloc-remaining-value ${
                  isFullyAllocated ? 'zero' : isOver ? 'over' : 'under'
                }`}
              >
                {fmt.format(Math.abs(remaining))}
              </span>
              {isFullyAllocated && (
                <span className="alloc-status-msg zero">Fully allocated ✓</span>
              )}
              {isOver && (
                <span className="alloc-status-msg over">
                  Over by {fmt.format(Math.abs(remaining))}
                </span>
              )}
              {!isFullyAllocated && !isOver && allocated > 0 && (
                <span className="alloc-status-msg under">
                  {fmt.format(remaining)} left
                </span>
              )}
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
            disabled={!isFullyAllocated || loading}
            aria-disabled={!isFullyAllocated || loading}
            aria-busy={loading}
          >
            {loading ? 'Saving…' : 'Confirm Allocation'}
          </button>

        </form>
      </div>
      <BottomNav />
    </div>
  )
}
