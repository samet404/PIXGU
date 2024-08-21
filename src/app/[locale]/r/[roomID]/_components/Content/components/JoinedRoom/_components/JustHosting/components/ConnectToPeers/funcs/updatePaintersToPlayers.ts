import { sendToAllPeers } from '@/utils/sendToAllPeers'
import { usePainterData } from '@/zustand/store'

export const updatePaintersToPlayers = () => {
  const painterData = usePainterData.getState().painter

  sendToAllPeers({
    from: 'host',
    event: 'currentPainter',
    data: painterData!.ID,
  })
}
