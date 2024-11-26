import { resetMatchStates } from '@/helpers/room'
import type { CurrentPainter } from '@/types'
import {
  useAmIGuessed,
  useGuessChatLayout,
  useGuessedPlayers,
  useIsGameStopped,
  useLetterHint,
  useNewPainterPanel,
  useOwnedPowerups,
  useRoomGuessChatMsgsStore,
  useRoomWinnersChatMsgsStore,
  useSelectThemePanel,
  useWhoIsPainterClient,
  useWinnersChatLayout,
} from '@/zustand/store'

export const getPainter = async (
  data: CurrentPainter['data'],
  myUserID: string,
) => {
  const amIPainter = myUserID === data

  if (useIsGameStopped.getState().value.code?.includes('waitingForHost'))
    useIsGameStopped.getState().removeCode('waitingForHost')

  useOwnedPowerups.getState().reset()
  useWhoIsPainterClient.getState().setCurrentPainter({
    painterID: data,
    amIPainter,
  })

  resetMatchStates()


  useLetterHint.getState().reset()
  useGuessedPlayers.getState().reset()
  useAmIGuessed.getState().noIMNotGuessed()

  if (amIPainter) {
    useSelectThemePanel.getState().open()
    useNewPainterPanel.getState().close()

    useRoomWinnersChatMsgsStore.getState().reset()
    useWinnersChatLayout.getState().setPainterLayout()
    useGuessChatLayout.getState().setPainterLayout()
    useRoomGuessChatMsgsStore.getState().reset()
  } else {
    useNewPainterPanel.getState().open({ painterID: data })
    useSelectThemePanel.getState().close()

    useWinnersChatLayout.getState().setImNotGuessed()
    useRoomWinnersChatMsgsStore.getState().reset()
    useGuessChatLayout.getState().setImNotGuessed()
    useRoomGuessChatMsgsStore.getState().reset()
  }
}
