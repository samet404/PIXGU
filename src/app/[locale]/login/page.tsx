import type { Metadata } from 'next'
import type { Locale } from '@/types'
import { Login } from '@/components/Login'

export const metadata: Metadata = {
  title: 'LOG IN',
  description: 'Log in and play PIXGU with your friends!',
  keywords: [
    'pixgu login',
    'PIXGU login',
    'pixgu sign in',
    'PIXGU sign in',
    'pixgu sign up',
    'PIXGU sign up',
    'pixgu create account',
    'PIXGU create account',
  ]
}

const Page = async ({ params }: Props) => {
  const { locale } = await params

  return <Login locale={locale} guest={true} />
}

export default Page

type Props = {
  params: Promise<{
    locale: Locale
  }>
}