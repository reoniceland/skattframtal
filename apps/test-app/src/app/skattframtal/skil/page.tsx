import { redirect } from 'next/navigation'

export default function SkattframtalPage() {
  // TODO check if user is logged in
  // TODO redirect according to current application state
  redirect('/skattframtal/stada')
}
