import { api } from '@/trpc/server'
import dynamic from 'next/dynamic'
import { AccountSection } from './components/Account'
import type { Locale } from '@/types/locale'

const GuestAccount = dynamic(() =>
  import('./components/GuestAccount').then((m) => m.GuestAccount),
)

const Account = async ({ params }: Props) => {
  const { locale } = await params
  const user = await api.auth.getUser.query()

  if (user) return <AccountSection locale={locale} user={user} />
  return <GuestAccount locale={locale} />
}

export default Account

type Props = {
  params: Promise<{
    locale: Locale
  }>
}