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
  stop: (code: Code) => void
  open: () => void
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

  open: () =>
    set({
      value: { ...get().value, isStopped: false, code: null },
    }),

  stop: (code) => {
    set({
      value: {
        ...get(),
        isStopped: true,
        code: [code, ...(get().value.code ?? [])],
      },
    })

    if (get().value.isStopped) return
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
