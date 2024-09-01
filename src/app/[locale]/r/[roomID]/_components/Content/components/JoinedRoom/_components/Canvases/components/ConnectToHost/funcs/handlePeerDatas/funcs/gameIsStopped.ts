import {
  useAmIPainting,
  useGuessChatLayout,
  useGuessedPlayers,
  useIsGameStopped,
  useMyCoin,
  useRoomGuessChatMsgsStore,
  useRoomWinnersChatMsgsStore,
  useWinnersChatLayout,
  useLastPixel,
  usePixelHistory,
  useCoins,
  useAmISpectator,
  usePixelsOnDraw,
  useSelectThemePanel,
  useWhoIsPainterClient,
} from '@/zustand/store'

export const gameIsStopped = () => {
  useIsGameStopped.getState().stop('waitingForHost')
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
  useAmISpectator.getState().reset()
  usePixelsOnDraw.getState().reset()
  useSelectThemePanel.getState().reset()
}
