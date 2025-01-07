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
  createdRoomsText: string
  createdRoomsCount: string
  createRoomBtnText: {
    idle: string
    loading: string
    success: string
    error: string
  }
  roomsData: {
    goToRoomBtnText: string
    killRoomBtnText: string
    noRoomsText: string
    errorText: string
    name: string
    password: string
    date: string
    playerCount: string
    version: string
  }

  main: {
    mods: {
      heading: string
      comingSoonText: string
    }

    name: {
      heading: string
      placeholder: string
    }

    password: {
      heading: string
      placeholder: string
      generateBtnText: string
    }
  }
}

type LangJSONs = PartialRecord<Exclude<Locale, 'en'>, () => Promise<LangObj>> &
  Record<'en', () => Promise<LangObj>>
