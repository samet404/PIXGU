import { setLocale } from '@/context/server'
import { api } from '@/trpc/server'
import type { Locale } from '@/types'
import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { Fragment, type ReactNode } from 'react'

const description =
  'Login now to start your pixelated adventure! Draw, guess, and unleash your artistic chaos.'
const title = 'LOGIN'
export const metadata: Metadata = {
  title,
  description,
  keywords: [
    'pixgu join',
    'pixgu login',
    'pixgu',
    'PIXGU',
    'draw',
    'guess',
    'pixel art',
    'virtual art',
    'art',
    'drawing',
    'painting',
    'pix',
    'pixel',
    'draw art',
    'draw pixel art',
  ],
  category: 'game',
  openGraph: {
    title,
    description,
  },
  icons: {
    icon: '/image/png/logo.png',
  },

  metadataBase: new URL('https://pixgu.com'),
}

const LoginLayout = async ({ params, children }: Props) => {
  const isLogged = await api.auth.isLogged.query()
  if (isLogged) redirect('/')

  setLocale((await params).locale)

  return <Fragment>{children}</Fragment>
}

export default LoginLayout

type Props = {
  params: Promise<{ locale: Locale }>
  children: ReactNode
}
