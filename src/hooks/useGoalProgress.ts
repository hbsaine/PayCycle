import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import { useAuth } from '../context/AuthContext'

export interface GoalProgressData {
  targetAmount: number
  currentAmount: number
  percentage: number
  loading: boolean
  error: string | null
}

export function useGoalProgress(): GoalProgressData {
  const { session, profile } = useAuth()
  const [currentAmount, setCurrentAmount] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const targetAmount = profile?.financial_goal_amount ?? 0
  const userId = session?.user.id

  useEffect(() => {
    if (!userId) {
      setLoading(false)
      return
    }

    let cancelled = false

    async function fetchSavings() {
      try {
        const { data, error: err } = await supabase
          .from('allocations')
          .select('savings')
          .eq('user_id', userId)

        if (cancelled) return

        if (err) throw err

        const totalSavings = (data ?? []).reduce(
          (sum, row) => sum + (row.savings ?? 0),
          0
        )
        setCurrentAmount(totalSavings)
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Failed to load savings')
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    fetchSavings()

    return () => {
      cancelled = true
    }
  }, [userId])

  const percentage = targetAmount > 0 ? Math.min(100, Math.round((currentAmount / targetAmount) * 100)) : 0

  return { targetAmount, currentAmount, percentage, loading, error }
}
