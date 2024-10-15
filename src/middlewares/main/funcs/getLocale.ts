import { match } from '@formatjs/intl-localematcher'
import Negotiator from 'negotiator'
import type { Locale } from '@/types'
import { type NextRequest } from 'next/server'

export const getLocale = (req: NextRequest, avaibleLocales: Locale[]) => {
  const headers = new Headers(req.headers)
  // @ts-expect-error
  let languages = new Negotiator({ headers }).languages()
  if (languages.length === 1 && languages[0] === '*') {
    languages = ['en']
  }
  let defaultLocale = 'en'

  return match(languages, avaibleLocales, defaultLocale)
}
