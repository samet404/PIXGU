import { negativeLog } from '@/utils/negativeLog'
import { sendToAllPeers } from '@/utils/sendToAllPeers'
import { create } from 'zustand'
import { createMatch } from '@/helpers/room'
import { sToMs } from '@/utils/sToMs'
import { postMsgToHostTimerWorker } from '@/workers'

type Value =
  | {
    status: 'painterSelectedTheme'
    themes: [string, string]
    selectedTheme: string
  }
  | {
    status: 'painterSelectingTheme'
    themes: [string, string]
  }
  | {
    status: 'waitingForPlayers'
  }

type State = {
  value: Value
}

type Action = {
  painterSelectedTheme: (theme: string) => void
  painterSelectingTheme: (themes: [string, string], roomID: string) => void
  reset: () => void
}

const initValue: State = {
  value: {
    status: 'waitingForPlayers',
  },
}

export const useHostPainterData = create<State & Action>((set, get) => ({
  ...initValue,
  painterSelectedTheme: (theme: string) => {
    const value = get().value

    if (value.status === 'painterSelectingTheme') {
      set({
        value: {
          themes: value.themes,
          status: 'painterSelectedTheme',
          selectedTheme: theme,
        },
      })
    } else negativeLog('ATTEMPTED TO SET THEME AT WRONG TIME')
  },
  painterSelectingTheme: (themes, roomID) => {
    const value = get().value
    const startedAt = Date.now()
    console.log('startedAt: ', startedAt)
    if (value.status === 'waitingForPlayers')
      set({
        value: {
          status: 'painterSelectingTheme',
          themes,
        },
      })
    else negativeLog('ATTEMPTED TO SET SELECTING THEME AT WRONG TIME')
  },

  reset: () => {
    const value = get().value
    if (value.status === 'painterSelectingTheme')
      postMsgToHostTimerWorker({
        ID: 'PAINTER_TIME_IS_UP',
        event: 'stop',
      })
    set(initValue)
  },
}))
