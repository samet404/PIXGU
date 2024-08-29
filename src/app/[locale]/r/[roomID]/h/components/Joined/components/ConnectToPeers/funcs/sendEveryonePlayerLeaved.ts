import { sendToAllPeers } from '@/utils'

export const sendEveryonePlayerLeaved = (playerID: string) => {
  sendToAllPeers(
    {
      from: 'host',
      event: 'playerLeft',
      data: {
        ID: playerID,
      },
    },
    {
      except: [playerID],
    },
  )
}
