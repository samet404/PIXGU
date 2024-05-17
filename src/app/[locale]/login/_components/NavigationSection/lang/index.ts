import 'server-only'

import type { Locale, PartialRecord } from '@/types'

const langJSONs: PartialRecord<Locale, () => Promise<LangObj>> = {
  en: () => import('./json/en.json').then((module) => module.default),
  tr: () => import('./json/tr.json').then((module) => module.default),
  // esi: () => import('./json/esi.json').then((module) => module.default),
}

export const getLangObj = (locale: Locale) => {
  const langJson = langJSONs[locale as Locale]
  if (!langJson) throw new Error(`No lang file for locale: ${locale}`)

  return langJson()
}

type keys = 'back' | 'home'

type LangObj = Record<keys, string>
