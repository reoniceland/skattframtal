import { SignInForm } from './sign-in-form'

export const dynamic = 'force-dynamic'

interface PageProps {
  searchParams: { redirectTo?: string }
}

export default function SignIn({ searchParams }: PageProps) {
  const redirectTo = searchParams.redirectTo ?? '/skattframtal/stada'

  return (
    <>
      <SignInForm redirectTo={redirectTo} />
    </>
  )
}
