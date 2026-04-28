import { useState } from 'react'
import { supabase } from '../lib/supabase'
import { useAuth } from '../context/AuthContext'

export interface NewAllocation {
  income_entry_id: string
  needs: number
  wants: number
  savings: number
  investments: number
}

export interface UseAllocationsResult {
  saveAllocation: (allocation: NewAllocation) => Promise<boolean>
  loading: boolean
  error: string | null
}

export function useAllocations(): UseAllocationsResult {
  const { session } = useAuth()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function saveAllocation(allocation: NewAllocation): Promise<boolean> {
    if (!session?.user.id) return false
    setLoading(true)
    setError(null)
    try {
      const { error: err } = await supabase
        .from('allocations')
        .insert({ ...allocation, user_id: session.user.id })
      if (err) throw err
      return true
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save allocation')
      return false
    } finally {
      setLoading(false)
    }
  }

  return { saveAllocation, loading, error }
}
