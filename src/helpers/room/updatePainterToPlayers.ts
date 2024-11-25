import { api } from '@/trpc/client'
import { sendToAllPeers } from '@/utils/sendToAllPeers'
import { sendToPainterPeer } from '@/utils/sendToPainterPeer'
import { sToMs } from '@/utils/sToMs'
import { postMsgToHostTimerWorker } from '@/workers'
import { useWhoIsPainter } from '@/zustand/store'
import { useHostPainterData } from '@/zustand/store/useHostPainterData'

export const updatePainterToPlayers = async (roomID: string) => {
  const whoIsPainter = useWhoIsPainter.getState().value
  if (whoIsPainter.status === 'thereIsNoPainter') return

  const painterID = whoIsPainter.painterID!
  sendToAllPeers({
    event: 'currentPainter',
    data: painterID,
  })

  const themes = await api.gameRoom.getThemes.query({
    roomID,
  })

  useHostPainterData.getState().painterSelectingTheme(themes, roomID)
  postMsgToHostTimerWorker({
    ID: 'PAINTER_TIME_IS_UP',
    type: 'timeout',
    event: 'start',
    ms: sToMs(20),
  })

  sendToAllPeers(
    {

      event: 'painterSelectingTheme',
    },
    {
      except: [painterID],
    },
  )

  sendToPainterPeer({

    event: 'selectTheme',
    data: themes,
  })
}
