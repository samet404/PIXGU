import 'server-only'

import type { Locale, PartialRecord } from '@/types'
import type { ControlsState } from '@/zustand/store'

const langJSONs: LangJSONs = {
  en: () => import('./json/en.json').then((m) => m.default),
  tr: () => import('./json/tr.json').then((m) => m.default),
  // esi: () => import('./json/esi.json').then((module) => module.default),
}

export const getLangObj = async (locale: Locale): Promise<LangObj> => {
  const langJson = langJSONs[locale as Locale]

  if (!langJson) return langJSONs['en']()
  return langJson()
}


type LangObj = {
  heading: string
  description: string
  keys: Record<keyof ControlsState['keys'], string>
}
type LangJSONs = PartialRecord<Exclude<Locale, 'en'>, () => Promise<LangObj>> &
  Record<'en', () => Promise<LangObj>>
