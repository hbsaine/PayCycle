import { useState } from 'react'
import { supabase } from '../lib/supabase'
import { useAuth } from '../context/AuthContext'

export interface NewIncomeEntry {
  amount: number
  date: string
  source: string
}

export interface UseIncomeResult {
  addIncome: (entry: NewIncomeEntry) => Promise<{ id: string } | null>
  loading: boolean
  error: string | null
}

export function useIncome(): UseIncomeResult {
  const { session } = useAuth()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function addIncome(entry: NewIncomeEntry): Promise<{ id: string } | null> {
    if (!session?.user.id) return null
    setLoading(true)
    setError(null)
    try {
      const { data, error: err } = await supabase
        .from('income_entries')
        .insert({ ...entry, user_id: session.user.id })
        .select('id')
        .single()
      if (err) throw err
      return data as { id: string }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save income')
      return null
    } finally {
      setLoading(false)
    }
  }

  return { addIncome, loading, error }
}
