import { useCallback, useEffect, useState } from 'react'

import type { TaxReturn } from '@/types/TaxReturn'

import { useUser } from './use-user'

export function useTaxReturns() {
  const { token } = useUser()
  const [taxReturn, setTaxReturn] = useState<TaxReturn | null>(null)
  const [error, setError] = useState<string | null>(null)

  const fetchTaxReturn = useCallback(async () => {
    if (!token) {
      throw new Error('Not authenticated')
    }
    const res = await fetch(
      'https://skattframtal-ald3y.ondigitalocean.app/tax-returns/current',
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

    const data = (await res.json()) as TaxReturn
    setTaxReturn(data)
    return data
  }, [token])

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchTaxReturn()
      } catch (error) {
        console.error(error)
        setError(
          error instanceof Error
            ? error.message
            : 'Mistókst að sækja skattframtal',
        )
      }
    }
    if (taxReturn === null) {
      void fetchData()
    }
  }, [fetchTaxReturn, taxReturn])

  return {
    taxReturn,
    fetchTaxReturn,
    error,
  }
}
