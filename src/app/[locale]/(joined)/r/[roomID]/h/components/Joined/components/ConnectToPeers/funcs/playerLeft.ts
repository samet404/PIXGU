import { negativeLog } from '@/utils'
import { useSocketIO } from '@/zustand/store'

export const playerLeft = () =>
  useSocketIO
    .getState()
    .io!.on('player-left', (ID: string) =>
      negativeLog(`USER ${ID} LEFT FROM SOCKET`),
    )
