import { useAmIPainting, useAmISpectator, useCoins, useGuessChatLayout, useGuessedPlayers, useIsGameStopped, useMatchStatusClient, useMyCoin, useNewPainterPanel, useRoomGuessChatMsgsStore, useRoomWinnersChatMsgsStore, useSelectThemePanel, useSpectators, useWhoIsPainterClient, useWinnersChatLayout } from '@/zustand/store'

export const gameIsStopped = () => {
  useIsGameStopped.getState().addCode('waitingForHost')
  useWhoIsPainterClient.getState().reset()
  useAmIPainting.getState().reset()
  useWinnersChatLayout.getState().reset()
  useGuessChatLayout.getState().reset()
  useRoomWinnersChatMsgsStore.getState().reset()
  useRoomGuessChatMsgsStore.getState().reset()
  useGuessedPlayers.getState().reset()
  useMyCoin.getState().reset()
  useCoins.getState().reset()
  useSpectators.getState().reset()
  useAmISpectator.getState().reset()
  useNewPainterPanel.getState().reset()
  useMatchStatusClient.getState().reset()
  useSelectThemePanel.getState().reset()

}
