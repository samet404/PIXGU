import { sendToAllPeers } from '@/utils/sendToAllPeers'
import { usePlayers } from '@/zustand/store'

export const sendEveryoneNewPlayer = (ID: string) => {
  const p = usePlayers.getState().value.obj[ID]!

  sendToAllPeers(
    {

      event: 'playerJoined',
      data: {
        ...p,
      },
    },
    { except: [ID] },
  )
}
