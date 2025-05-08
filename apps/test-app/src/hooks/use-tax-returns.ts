import { useCallback, useEffect, useState } from 'react'

import type { TaxReturns } from '@/types/TaxReturns'

import { set } from 'date-fns'

import { useUser } from './use-user'

export function useTaxReturns() {
  const { token } = useUser()
  const [taxReturns, setTaxReturns] = useState<TaxReturns | null>(null)
  const [error, setError] = useState<string | null>(null)

  const fetchTaxReturns = useCallback(async () => {
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

    const data = (await res.json()) as TaxReturns
    setTaxReturns(data)
    return data
  }, [token])

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchTaxReturns()
      } catch (error) {
        console.error(error)
        setError(
          error instanceof Error
            ? error.message
            : 'Mistókst að sækja skattframtal',
        )
      }
    }
    if (taxReturns === null) {
      void fetchData()
    }
  }, [fetchTaxReturns, taxReturns])

  return {
    taxReturns,
    fetchTaxReturns,
    error,
  }
}
