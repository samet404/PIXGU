import {
  useHostingHealth,
  useOtherHostRoomStatus,
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
  const otherHostRoomStatues = useOtherHostRoomStatus.getState().get()

  usePeers.getState().removePeer(userID)
  soketiClient.unsubscribe(
    toPusherKey(`private-room-${roomID}:connect_to_host:${userID}`),
  )

  usePlayers.getState().removePlayer(userID)

  if (usePlayers.getState().value.count <= 1) {
    setHostingHealth('waitingForPlayers')
    if (otherHostRoomStatues.matchInterval)
      clearInterval(otherHostRoomStatues.matchInterval)
  } else if (useWhoIsPainter.getState().isPainter(userID)) {
    if (otherHostRoomStatues.matchInterval)
      clearInterval(otherHostRoomStatues.matchInterval)

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
