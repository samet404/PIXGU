import { create } from 'zustand'
import { useWhoIsPainterClient } from './useWhoIsPainterClient'
import { useAmIPainting } from './useAmIPainting'
import { useWinnersChatLayout } from './useWinnersChatLayout'
import { useGuessChatLayout } from './useGuessChatLayout'
import { useRoomWinnersChatMsgsStore } from './useRoomWinnersChatMsgs'
import { useRoomGuessChatMsgsStore } from './useRoomGuessChatMsgs'
import { useGuessedPlayers } from './useGuessedPlayers'
import { useMyCoin } from './useMyCoin'
import { useCoins } from './useCoins'
import { useLastPixel } from './useLastPixel'
import { usePixelHistory } from './usePixelHistory'
import { useSpectators } from './useSpectators'
import { useAmISpectator } from './useAmISpectator'
import { usePixelsOnDraw } from './usePixelsOnDraw'
import { useSelectThemePanel } from './useSelectThemePanel'
import { useNewPainterPanel } from './useNewPainterPanel'
import { useMatchStatusClient } from './useMatchStatusClient'

type Code = 'connectingToHost' | 'waitingForHost' | 'waitingForPlayers'

type State = {
  value:
    | {
        isStopped: true
        code: Code[]
      }
    | {
        isStopped: false
        code: null
      }
}

type Action = {
  removeCode: (code: Code) => void
  addCode: (code: Code) => void
  reset: () => void
}

const initState: State = {
  value: {
    isStopped: true,
    code: ['connectingToHost', 'waitingForPlayers', 'waitingForHost'],
  },
}

export const useIsGameStopped = create<State & Action>((set, get) => ({
  ...initState,

  removeCode: (code) => {
    if (!get().value.isStopped) return
    if (get().value.code?.length === 1) {
      set({
        value: { isStopped: false, code: null },
      })
      return
    }

    set({
      value: {
        isStopped: true,
        code: (get().value.code ?? []).filter((c) => c !== code),
      },
    })
  },

  addCode: (code) => {
    set({
      value: {
        ...get(),
        isStopped: true,
        code: [code, ...(get().value.code ?? [])],
      },
    })

    useWhoIsPainterClient.getState().reset()
    useAmIPainting.getState().reset()
    useWinnersChatLayout.getState().reset()
    useGuessChatLayout.getState().reset()
    useRoomWinnersChatMsgsStore.getState().reset()
    useRoomGuessChatMsgsStore.getState().reset()
    useGuessedPlayers.getState().reset()
    useMyCoin.getState().reset()
    useCoins.getState().reset()
    useLastPixel.getState().reset()
    usePixelHistory.getState().reset()
    useSpectators.getState().reset()
    useAmISpectator.getState().reset()
    usePixelsOnDraw.getState().reset()
    useNewPainterPanel.getState().reset()
    useMatchStatusClient.getState().reset()
    useSelectThemePanel.getState().reset()
  },
  reset: () => set(initState),
}))
