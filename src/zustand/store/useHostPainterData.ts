import { negativeLog } from '@/utils/negativeLog'
import { sendToAllPeers } from '@/utils/sendToAllPeers'
import { create } from 'zustand'
import { useMatchStatus } from './useMatchStatus'
import { createMatch } from 'src/funcs/createMatch'
import { sToMs } from '@/utils/sToMs'

type Value =
  | {
      status: 'painterSelectedTheme'
      themes: [string, string]
      selectedTheme: string
    }
  | {
      status: 'painterSelectingTheme'
      themes: [string, string]
      timeIsUpTimeout: ReturnType<typeof setTimeout>
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

    if (value.status === 'waitingForPlayers')
      set({
        value: {
          status: 'painterSelectingTheme',
          themes,
          timeIsUpTimeout: setTimeout(() => {
            sendToAllPeers({
              from: 'host',
              event: 'painterCouldNotSelectTheme',
              data: 'timeIsUp',
            })

            useMatchStatus.getState().cancel()
            useHostPainterData.getState().reset()
            createMatch(roomID)
          }, sToMs(20)),
        },
      })
    else negativeLog('ATTEMPTED TO SET SELECTING THEME AT WRONG TIME')
  },

  reset: () => {
    const value = get().value
    if (value.status === 'painterSelectingTheme' && value.timeIsUpTimeout)
      clearTimeout(value.timeIsUpTimeout)
    set(initValue)
  },
}))
