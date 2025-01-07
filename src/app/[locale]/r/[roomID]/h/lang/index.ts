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
  health: {
    waitingForPlayers: {
      title: string
      description: string
    }

    readyToStart: {
      title: string
      description: string
    }

    gameIsStarted: {
      title: string
      description: string
    }

    gameEnded: {
      title: string
      description: string
    },

    join: string
    help: string
    copy: string
    copied: string
    start: string
    stop: string
  },

  navbar: {
    players: string
    canvas: string
  }
}

type LangJSONs = PartialRecord<Exclude<Locale, 'en'>, () => Promise<LangObj>> &
  Record<'en', () => Promise<LangObj>>
