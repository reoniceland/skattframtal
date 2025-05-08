import { useCallback, useEffect, useState } from 'react'

import type { Salary } from '@/types/Salary'

import { useUser } from './use-user'

export function useSalaries() {
  const { token } = useUser()
  const [salaries, setSalaries] = useState<Salary[] | null>(null)
  const [error, setError] = useState<string | null>(null)

  const fetchSalaries = useCallback(async () => {
    if (!token) {
      throw new Error('Not authenticated')
    }
    const res = await fetch(
      'https://skattframtal-ald3y.ondigitalocean.app/salaries',
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

    const data = (await res.json()) as Salary[]
    setSalaries(data)
    return data
  }, [token])

  const fetchSalary = useCallback(
    async (id: string) => {
      if (!token) {
        throw new Error('Not authenticated')
      }
      const res = await fetch(
        `https://skattframtal-ald3y.ondigitalocean.app/salaries/${id}`,
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
      const data = (await res.json()) as Salary[]
      return data
    },
    [token],
  )

  const addSalary = useCallback(
    async (salary: Salary) => {
      if (!token) {
        throw new Error('Not authenticated')
      }
      const res = await fetch(
        'https://skattframtal-ald3y.ondigitalocean.app/salaries',
        {
          method: 'POST',
          headers: {
            Authorization: token,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(salary),
        },
      )

      if (!res.ok) {
        const text = await res.text()
        throw new Error(text || 'Mistókst að vista skattframtal')
      }

      await fetchSalaries()
    },
    [token, fetchSalaries],
  )

  const updateSalary = useCallback(
    async (salary: Salary) => {
      if (!token) {
        throw new Error('Not authenticated')
      }
      if (!salary.id) {
        throw new Error('Salary ID is required for update')
      }
      const res = await fetch(
        `https://skattframtal-ald3y.ondigitalocean.app/salaries/${salary.id}`,
        {
          method: 'PATCH',
          headers: {
            Authorization: token,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(salary),
        },
      )

      if (!res.ok) {
        const text = await res.text()
        throw new Error(text || 'Mistókst að vista skattframtal')
      }

      await fetchSalaries()
    },
    [token, fetchSalaries],
  )

  const sumOfSalaries = salaries?.reduce((acc, salary) => {
    if (typeof salary.amount === 'string') {
      return acc + parseFloat(salary.amount)
    }
    return acc + salary.amount
  }, 0)

  const employerNames = salaries
    ?.map((salary) => salary.employerName)
    .filter(Boolean)
    .join(', ')

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchSalaries()
      } catch (error) {
        console.error(error)
        setError(
          error instanceof Error
            ? error.message
            : 'Mistókst að sækja skattframtal',
        )
      }
    }
    if (salaries === null && token) {
      void fetchData()
    }
  }, [fetchSalaries, salaries, token])

  return {
    salaries,
    addSalary,
    updateSalary,
    fetchSalaries,
    fetchSalary,
    sumOfSalaries,
    employerNames,
    error,
  }
}
