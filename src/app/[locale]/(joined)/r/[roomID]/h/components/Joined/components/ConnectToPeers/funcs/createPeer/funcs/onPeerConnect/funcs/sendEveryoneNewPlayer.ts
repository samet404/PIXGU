import { sendToAllPeers } from '@/utils/sendToAllPeers'
import { usePlayers } from '@/zustand/store'

export const sendEveryoneNewPlayer = (ID: string, isSpectator: boolean) => {
  const p = usePlayers.getState().value.obj[ID]!

  sendToAllPeers(
    {
      from: 'host',
      event: 'playerJoined',
      data: {
        ...p,
        isSpectator,
      },
    },
    { except: [ID] },
  )
}
