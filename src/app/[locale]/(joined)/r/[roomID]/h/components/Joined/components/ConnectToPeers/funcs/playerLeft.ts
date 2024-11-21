import {
  useHostingHealth,
  useMatchStatus,
  usePeers,
  usePlayers,
  useWhoIsPainter,
} from '@/zustand/store'
import { negativeLog } from '@/utils/negativeLog'
import { sendToAllPeers } from '@/utils/sendToAllPeers'
import { goldLog } from '@/utils/goldLog'
import { createMatch } from '@/helpers/room'

export const playerLeft = (userID: string, roomID: string) => {
  goldLog(`PLAYER ${userID} LEFT THE GAME`)
  const setHostingHealth = useHostingHealth.getState().set

  usePeers.getState().removePeer(userID)
  usePlayers.getState().removePlayer(userID)

  if (usePlayers.getState().value.count <= 1) {
    setHostingHealth('waitingForPlayers')
    useMatchStatus.getState().reset()
  } else if (useWhoIsPainter.getState().isPainter(userID)) {
    sendToAllPeers({

      event: 'painterCouldNotSelectTheme',
      data: 'playerLeft',
    })

    useMatchStatus.getState().cancelInterval()
    createMatch(roomID)
  }

  sendToAllPeers(
    {

      event: 'playerLeft',
      data: {
        ID: userID,
      },
    },
    {
      except: [userID],
    },
  )
  negativeLog(`CONNECTION TO ${userID} CLOSED`)
}
