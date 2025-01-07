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
  canvases: {
    chooseTheme: string
    selectingThemeTimerDescs: {
      '100': string
      '60': string
      '50': string
      '25': string
      '0': string
    }
    loading: string
  }
  nav: {
    matchCount: {
      heading: string
      description: string
    }

    theme: string

    hostConnection: {
      connected: string
      failed: string
      disconnected: string
      connecting: string
      findingHost: string
    }

    matchTime: {
      remainTime: {
        minutes: string
        seconds: string
      }

      info: {
        coinAlert: string
        runningPowerups: {
          running: string
          noRunning: string
        }
        yourEarning: {
          painter: string
          guesser: string
          coins: string
        }
      }
    }

    btnOptionsShortcut: {
      loading: string
    }

    btnOptions: {
      controls: string
      sounds: string
      exit: string
      back: string
    }
  }

  painterToolGuideText: string

  gameEnded: {
    heading: string
  }

  status: {
    connecting: {
      heading: string
    }
    webrtcFailed: {
      heading: string
    }
    finding: {
      heading: string
      hostIsNotFound: string
    }
    disconnected: {
      heading: string
    }
    tryAgain: string
    goToActiveRooms: string
    waitingForPlayers: string
    waitingForHost: string
  }

  shortcuts: {
    toolAlert: {
      pencil: string
      bucket: string
      eyeDropper: string
      eraser: string
      increaseToolSize: string
      decreaseToolSize: string
      gridOpened: string
      gridClosed: string
      undo: string
      redo: string
      UR: string
      PBP: string
      BO: string
      changeURType: {
        BO: string
        PBP: string
      }
    }
  }

  chats: {
    guessChat: {
      displayName: string
    }
    generalChat: {
      displayName: string
    }
  }

  canvasTools: {
    changeUR: {
      heading: string
      BO: string
      PBP: string
    }

    layers: {
      heading: string
    }

    gradientType: {
      heading: string
    }

    comingSoon: string
  }
}

type LangJSONs = PartialRecord<Exclude<Locale, 'en'>, () => Promise<LangObj>> &
  Record<'en', () => Promise<LangObj>>
