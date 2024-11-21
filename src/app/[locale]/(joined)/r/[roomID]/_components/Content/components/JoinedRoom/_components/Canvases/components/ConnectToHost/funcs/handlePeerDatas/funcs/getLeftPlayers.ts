import type { PlayerLeft } from '@/types'
import { useAmIPainting, useAmISpectator, useCoins, useGuessedPlayers, useMatchStatusClient, useMyCoin, useRoomGuessChatMsgsStore, useRoomWinnersChatMsgsStore, useSpectators } from '@/zustand/store'

export const getLeftPlayers = async (data: PlayerLeft['data']) => {
  const { usePlayers, useWhoIsPainterClient } = await import('@/zustand/store')
  const whoIsPainter = useWhoIsPainterClient.getState().value

  usePlayers.getState().removePlayer(data.ID)
  const isPainter = useWhoIsPainterClient.getState().isPainter(data.ID)

  if (isPainter || usePlayers.getState().value.count === 0) {
    useWhoIsPainterClient.getState().reset()

    const {
      useIsGameStopped,
      useGuessChatLayout,
      useNewPainterPanel,
      useSelectThemePanel,
      useWinnersChatLayout,
    } = await import('@/zustand/store')

    if (usePlayers.getState().value.count === 0) {
      useIsGameStopped.getState().addCode('waitingForPlayers')
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
    useWhoIsPainterClient.getState().reset()
    useGuessChatLayout.getState().reset()
    useWinnersChatLayout.getState().reset()
    useNewPainterPanel.getState().reset()
    useSelectThemePanel.getState().reset()

    if (whoIsPainter.status === 'currentPainter' && whoIsPainter.amIPainter) {
      useWhoIsPainterClient.getState().reset()
    }
  }
}
