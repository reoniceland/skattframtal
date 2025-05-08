import { useCallback, useEffect, useState } from 'react'

import type { User } from '../types/User'

export function useUser() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  const fetchUser = useCallback(async (token: string) => {
    try {
      setLoading(true)
      setError(null)

      const res = await fetch(
        'https://skattframtal-ald3y.ondigitalocean.app/users/me',
        {
          method: 'GET',
          headers: {
            Authorization: token,
          },
        },
      )

      if (!res.ok) {
        const text = await res.text()
        throw new Error(text || 'Mistókst að sækja notanda')
      }

      const userData = (await res.json()) as User
      setUser(userData)
      return userData
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Mistókst að sækja notanda'
      setError(errorMessage)
      return null
    } finally {
      setLoading(false)
    }
  }, [])

  const loginWithKennitala = useCallback(
    async (kennitala: string) => {
      try {
        setLoading(true)
        setError(null)

        const res = await fetch(
          'https://skattframtal-ald3y.ondigitalocean.app/auth/login',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ kennitala }),
          },
        )

        if (!res.ok) {
          const text = await res.text()
          throw new Error(text || 'Innskráning mistókst')
        }

        const { token } = (await res.json()) as { token: string }

        document.cookie = [
          `token=${token}`,
          'Path=/',
          'Max-Age=86400',
          'Secure',
          'SameSite=Lax',
        ].join('; ')

        // Fetch user after successful login
        try {
          await fetchUser(token)
        } catch (err) {}
        return { success: true, token }
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : 'Innskráning mistókst'
        setError(errorMessage)
        return { success: false, error: errorMessage }
      } finally {
        setLoading(false)
      }
    },
    [fetchUser],
  )

  const logout = useCallback(() => {
    document.cookie =
      'token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT; Secure; SameSite=Lax'
    setUser(null)
  }, [])

  // Check for existing session on mount
  useEffect(() => {
    // Get token from cookies on the client side
    const token =
      document.cookie
        .split('; ')
        .find((row) => row.startsWith('token='))
        ?.split('=')[1] ?? ''
    if (token) {
      fetchUser(token).catch(() => {
        // Error is already handled in fetchUser
      })
    } else {
      setLoading(false)
    }
  }, [fetchUser])

  return {
    user,
    loading,
    error,
    loginWithKennitala,
    fetchUser,
    logout,
    isLoggedIn: !!user,
    clearError: () => {
      setError(null)
    },
  }
}
