import type { GameEnded } from '@/types/webRTCConnData'
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
import { useSpectators } from './useSpectators'
import { useAmISpectator } from './useAmISpectator'
import { useSelectThemePanel } from './useSelectThemePanel'
import { useNewPainterPanel } from './useNewPainterPanel'
import { useMatchStatusClient } from './useMatchStatusClient'
import { storePixelHistory, storePixelsOnDraw } from '@/store'

type State = {
  value:
  | ({
    isOpen: true
  } & GameEnded['data'])
  | {
    isOpen: false
  }
}

type Action = {
  open: (input: GameEnded['data']) => void
  close: () => void
  reset: () => void
}

const initState: State = {
  value: {
    isOpen: false,
  },
}

export const useGameEndedPanel = create<State & Action>((set, get) => ({
  ...initState,

  open: (input) => {
    set({
      value: {
        isOpen: true,
        ...input,
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
    storePixelHistory.reset()
    useSpectators.getState().reset()
    useAmISpectator.getState().reset()
    storePixelsOnDraw.reset()
    useNewPainterPanel.getState().reset()
    useMatchStatusClient.getState().reset()
    useSelectThemePanel.getState().reset()
  },

  close: () =>
    set({
      value: {
        isOpen: false,
      },
    }),

  reset: () => set(initState),
}))
