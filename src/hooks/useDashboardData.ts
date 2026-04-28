import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import { useAuth } from '../context/AuthContext'

export interface CategoryTotals {
  needs: number
  wants: number
  savings: number
  investments: number
}

export interface DashboardData {
  totalBalance: number
  categoryTotals: CategoryTotals
  loading: boolean
  error: string | null
}

export function useDashboardData(): DashboardData {
  const { session } = useAuth()
  const [totalBalance, setTotalBalance] = useState(0)
  const [categoryTotals, setCategoryTotals] = useState<CategoryTotals>({
    needs: 0,
    wants: 0,
    savings: 0,
    investments: 0,
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const userId = session?.user.id

  useEffect(() => {
    if (!userId) {
      setLoading(false)
      return
    }

    let cancelled = false

    async function fetchData() {
      try {
        const [incomeResult, allocationsResult] = await Promise.all([
          supabase.from('income_entries').select('amount').eq('user_id', userId),
          supabase
            .from('allocations')
            .select('needs, wants, savings, investments')
            .eq('user_id', userId),
        ])

        if (cancelled) return

        if (incomeResult.error) throw incomeResult.error
        if (allocationsResult.error) throw allocationsResult.error

        const balance = (incomeResult.data ?? []).reduce(
          (sum, row) => sum + (row.amount ?? 0),
          0
        )
        setTotalBalance(balance)

        const totals = (allocationsResult.data ?? []).reduce(
          (acc, row) => ({
            needs: acc.needs + (row.needs ?? 0),
            wants: acc.wants + (row.wants ?? 0),
            savings: acc.savings + (row.savings ?? 0),
            investments: acc.investments + (row.investments ?? 0),
          }),
          { needs: 0, wants: 0, savings: 0, investments: 0 }
        )
        setCategoryTotals(totals)
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Failed to load data')
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    fetchData()

    return () => {
      cancelled = true
    }
  }, [userId])

  return { totalBalance, categoryTotals, loading, error }
}
