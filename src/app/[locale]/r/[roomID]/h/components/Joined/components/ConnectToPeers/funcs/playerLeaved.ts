import {
  useHostingHealth,
  useMatchStatus,
  usePeers,
  usePlayers,
  useWhoIsPainter,
} from '@/zustand/store'
import { toPusherKey } from '@/utils/toPusherKey'
import type Pusher from 'pusher-js'
import { sendEveryonePlayerLeaved } from './sendEveryonePlayerLeaved'
import { createMatch } from './createMatch'
import { negativeLog } from '@/utils/negativeLog'
import { sendToAllPeers } from '@/utils/sendToAllPeers'
import { goldLog } from '@/utils/goldLog'

export const playerLeaved = (
  soketiClient: Pusher,
  userID: string,
  roomID: string,
) => {
  goldLog(`PLAYER ${userID} LEFT THE GAME`)
  const setHostingHealth = useHostingHealth.getState().set

  usePeers.getState().removePeer(userID)
  soketiClient.unsubscribe(
    toPusherKey(`private-room-${roomID}:connect_to_host:${userID}`),
  )

  usePlayers.getState().removePlayer(userID)

  if (usePlayers.getState().value.count <= 1) {
    setHostingHealth('waitingForPlayers')

    const interval = useMatchStatus.getState().value.matchInterval
    if (interval) clearInterval(interval)
  } else if (useWhoIsPainter.getState().isPainter(userID)) {
    const interval = useMatchStatus.getState().value.matchInterval
    if (interval) clearInterval(interval)
    sendToAllPeers({
      from: 'host',
      event: 'painterCouldNotSelectTheme',
      data: 'playerLeft',
    })

    createMatch(roomID)
  }

  sendEveryonePlayerLeaved(userID)
  negativeLog(`CONNECTION TO ${userID} CLOSED`)
}
