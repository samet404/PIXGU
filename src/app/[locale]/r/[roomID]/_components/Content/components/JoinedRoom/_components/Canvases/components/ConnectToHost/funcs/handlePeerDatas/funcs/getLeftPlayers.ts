import type { PlayerLeft } from '@/types'

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

    if (usePlayers.getState().value.count === 0)
      useIsGameStopped.getState().stop('waitingForPlayers')
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
