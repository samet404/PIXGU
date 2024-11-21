import { negativeLog } from '@/utils/negativeLog'
import { sendToAllPeers } from '@/utils/sendToAllPeers'
import { create } from 'zustand'
import { createMatch } from '@/helpers/room'
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
    timeIsUpIntervalStartedAt: number
    timeIsUpInterval: ReturnType<typeof setInterval>
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
          timeIsUpIntervalStartedAt: startedAt,
          timeIsUpInterval: setInterval(() => {
            const data = get().value
            if (data.status !== 'painterSelectingTheme') return

            const passedMs = Date.now() - startedAt
            console.log('timeIsUpInterval passed ms: ', passedMs, {
              passedMs,
              timeIsUpIntervalStartedAt: startedAt,
              data,
            })
            if (passedMs >= sToMs(20)) {
              clearInterval(data.timeIsUpInterval)

              sendToAllPeers({
                event: 'painterCouldNotSelectTheme',
                data: 'timeIsUp',
              })

              createMatch(roomID)
            }
          }, 1000),
        },
      })
    else negativeLog('ATTEMPTED TO SET SELECTING THEME AT WRONG TIME')
  },

  reset: () => {
    const value = get().value
    if (value.status === 'painterSelectingTheme' && value.timeIsUpInterval)
      clearInterval(value.timeIsUpInterval)
    set(initValue)
  },
}))
