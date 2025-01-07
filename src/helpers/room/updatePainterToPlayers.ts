import type { Locale } from '@/types/locale'
import { sendToAllPeers } from '@/utils/sendToAllPeers'
import { useSocketIO, useWhoIsPainter } from '@/zustand/store'

export const updatePainterToPlayers = ({ locale }: { locale: Locale }) => {
  const whoIsPainter = useWhoIsPainter.getState().value
  if (whoIsPainter.status === 'thereIsNoPainter') return

  const painterID = whoIsPainter.painterID!
  sendToAllPeers({
    event: 'currentPainter',
    data: painterID,
  })

  useSocketIO.getState().io!.emit('get-random-themes', {
    locale,
  })
}
