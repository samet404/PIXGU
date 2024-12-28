import 'server-only'

import type { Locale, PartialRecord } from '@/types'

const langJSONs: LangJSONs = {
  en: () => import('./json/en.json').then((m) => m.default),
  tr: () => import('./json/tr.json').then((m) => m.default),
}

export const getLangObj = async (locale: Locale): Promise<LangObj> => {
  const langJson = langJSONs[locale as Locale]

  if (!langJson) return langJSONs['en']()
  return langJson()
}



export type LangObj = {
  'dontforget': string
  'join': string
  'refresh': string
  'noroom': string
  roomKeysTexts: {
    'country': string
    'createdAt': string
    'distance': string
    'public': string
    'private': string
    'playerCount': string
    'version': string
  }
}
type LangJSONs = PartialRecord<Exclude<Locale, 'en'>, () => Promise<LangObj>> &
  Record<'en', () => Promise<LangObj>>
