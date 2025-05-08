import { useCallback, useEffect, useState } from 'react'

import type { TaxReturns } from '@/types/TaxReturns'

import { useUser } from './use-user'

export function useGrants() {
  const { token } = useUser()
  const [grants, setGrants] = useState<any | null>(null)
  const [error, setError] = useState<string | null>(null)

  const fetchGrants = useCallback(async () => {
    if (!token) {
      throw new Error('Not authenticated')
    }
    const res = await fetch(
      'https://skattframtal-ald3y.ondigitalocean.app/grants',
      {
        method: 'GET',
        headers: {
          Authorization: token,
        },
      },
    )
    if (!res.ok) {
      const text = await res.text()
      throw new Error(text || 'Mistókst að sækja skattframtal')
    }

    const data = (await res.json()) as TaxReturns
    setGrants(data)
    return data
  }, [token])

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchGrants()
      } catch (error) {
        console.error(error)
        setError(
          error instanceof Error
            ? error.message
            : 'Mistókst að sækja skattframtal',
        )
      }
    }
    if (grants === null) {
      void fetchData()
    }
  }, [fetchGrants, grants])

  return {
    grants,
    fetchGrants,
    error,
  }
}
