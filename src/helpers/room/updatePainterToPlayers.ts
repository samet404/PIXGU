import type { Locale } from '@/types/locale'
import { sendToAllPeers } from '@/utils/sendToAllPeers'
import { useSocketIO } from '@/zustand/store/useSocketIO'
import { useWhoIsPainter } from '@/zustand/store/useWhoIsPainter'

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
