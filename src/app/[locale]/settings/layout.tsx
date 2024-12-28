import { type ReactNode } from 'react'
import Nav from './components/Nav'
import { Inter } from 'next/font/google'
import type { Locale } from '@/types/locale'

const inter = Inter({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
})

export const metadata = {
  title: 'SETTINGS',
}

export default async function Layout({ params, children }: Props) {
  const { locale } = await params

  return (
    <div className="flex h-full w-full flex-row bg-slate-400">
      <Nav locale={locale} />
      <main
        className={`${inter.className} z-0 flex h-full grow flex-col bg-gradient-to-tl from-[rgba(189,255,185,0.4)] via-[hsla(189,100%,86%,0)] to-[rgba(242,255,187,0.4)] p-2`}
      >
        {children}

      </main>
    </div>
  )
}

type Props = {
  children: ReactNode
  params: Promise<{
    locale: Locale
  }>
}