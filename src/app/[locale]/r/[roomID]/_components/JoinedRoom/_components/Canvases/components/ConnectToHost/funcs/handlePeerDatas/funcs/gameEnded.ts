import type { GameEnded } from '@/types/webRTCConnData'
import { useAmISpectator } from '@/zustand/store/useAmISpectator'
import { useGameEndedPanel } from '@/zustand/store/useGameEndedPanel'
import { useNewPainterPanel } from '@/zustand/store/useNewPainterPanel'
import { useSelectThemePanel } from '@/zustand/store/useSelectThemePanel'
import { useSpectators } from '@/zustand/store/useSpectators'
import { useWhoIsPainterClient } from '@/zustand/store/useWhoIsPainterClient'
import { useXY } from '@/zustand/store/useXY'
import { resetMatchStates } from '@/helpers/room'
import { postMsgToPlayerTimerWorker } from '@/workers'

export const gameEnded = (data: GameEnded['data']) => {
  useGameEndedPanel.getState().open(data)
  postMsgToPlayerTimerWorker({
    ID: 'GAME_ENDED',
    event: 'start',
    ms: 50,
    type: 'interval'
  })
  resetMatchStates()
  postMsgToPlayerTimerWorker({
    event: 'stop',
    ID: 'MATCH_REMAIN_TIME'
  })
  postMsgToPlayerTimerWorker({
    event: 'stop',
    ID: 'PAINTER_SELECTING_REMAIN_TIME'
  })

  useSpectators.getState().reset()
  useAmISpectator.getState().reset()
  useNewPainterPanel.getState().reset()
  useSelectThemePanel.getState().reset()
  useWhoIsPainterClient.getState().reset()
  useXY.getState().reset()
}