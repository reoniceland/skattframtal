export async function loginWithKennitala(kennitala: string) {
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
    throw new Error(text || 'Authentication failed')
  }

  const { token } = await res.json()

  document.cookie = [
    `token=${token}`,
    'Path=/',
    'Max-Age=86400',
    'Secure',
    'SameSite=Lax',
  ].join('; ')

  return token
}
