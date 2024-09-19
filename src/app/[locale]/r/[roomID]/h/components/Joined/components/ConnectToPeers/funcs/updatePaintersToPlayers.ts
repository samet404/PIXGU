import { api } from '@/trpc/client'
import { sendToAllPeers } from '@/utils/sendToAllPeers'
import { sendToPainterPeer } from '@/utils/sendToPainterPeer'
import { sToMs } from '@/utils/sToMs'
import { useMatchStatus, useWhoIsPainter } from '@/zustand/store'
import { useHostPainterData } from '@/zustand/store/useHostPainterData'
import { createMatch } from './createMatch'

export const updatePaintersToPlayers = async (roomID: string) => {
  const whoIsPainter = useWhoIsPainter.getState().value
  if (whoIsPainter.status === 'thereIsNoPainter') return

  const painterID = whoIsPainter.painterID
  sendToAllPeers({
    from: 'host',
    event: 'currentPainter',
    data: painterID,
  })

  const themes = (await api.gameRoom.getThemes.query({
    roomID,
  })) as [string, string]

  useHostPainterData.getState().set({
    status: 'painterSelectingTheme',
    themes,
    timeIsUpTimeout: setTimeout(() => {
      sendToAllPeers({
        from: 'host',
        event: 'painterCouldNotSelectTheme',
        data: 'timeIsUp',
      })

      useMatchStatus.getState().cancel()

      createMatch(roomID)
    }, sToMs(20)),
  })

  sendToAllPeers(
    {
      from: 'host',
      event: 'painterSelectingTheme',
    },
    {
      except: [painterID],
    },
  )

  sendToPainterPeer({
    from: 'host',
    event: 'selectTheme',
    data: themes,
  })
}
