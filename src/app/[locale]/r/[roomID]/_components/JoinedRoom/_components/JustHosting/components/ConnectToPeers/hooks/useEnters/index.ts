import type { Message } from 'ably'
import type { WebRTCSignalData } from '@/types'
import { subscribeAblyPresence } from '@/utils/subscribeAblyPresence'
import { simplePeer } from '@/utils/simplePeer'
import { useEffectOnce } from '@/hooks/useEffectOnce'
import { useContext } from 'react'
import { positiveLog, negativeLog, sendToPeer, goldLog } from '@/utils'
import { RoomPlayersIDsOrderedByTimestampCtx } from '@/context/client'
import { updatePlayersIDs } from './funcs'
import { createMatchTimeout } from './funcs/createMatchTimeout'
import {
  AblyClientContext,
  OtherHostRoomStatuesCtx,
  PainterDataContext,
  PeersContext,
  RoomIDContext,
  UserIDContext,
} from '@/context/client'
import { updatePaintersToPlayers } from './funcs/updatePaintersToPlayers'
import { useInterval } from 'usehooks-ts'

/**
 * This hook handles everything about entering room.
 * Enters a room, subscribes to the 'enter' presence event on the room channel and updates current players states.
 * When a other user enters the room, a peer offer is created and sent to the entered user.
 */
export const useEnters = () => {
  const ablyClient = useContext(AblyClientContext)!
  const myUserID = useContext(UserIDContext)
  const roomID = useContext(RoomIDContext)
  const peers = useContext(PeersContext)
  const playersIDsOrderedByTimestamp = useContext(
    RoomPlayersIDsOrderedByTimestampCtx,
  )
  const painterData = useContext(PainterDataContext)
  const otherStatues = useContext(OtherHostRoomStatuesCtx)

  useEffectOnce(() => {
    const roomChannel = ablyClient.channels.get(`room:${roomID}`)
    subscribeAblyPresence(roomChannel, 'enter', (msg: Message) => {
      const userID = msg.clientId!
      console.log()
      if (userID === myUserID) return null

      positiveLog(`USER ${userID} ENTERED >`)
      positiveLog(`INITIATING PEER CONNECTION TO ${userID}`)

      const themConnectChannel = ablyClient.channels.get(
        `room:${roomID}:connect:${userID}`,
      )
      const peer = simplePeer({
        initiator: true,
      })

      peers[userID] = { peer }

      peers[userID]!.peer.on('signal', (data: WebRTCSignalData) => {
        if (data.type === 'offer') {
          console.log(data)
          goldLog(`OFFER SENT TO ${userID}`)
          themConnectChannel.publish('offer', data)
        }
      })

      peers[userID]!.peer.on('error', (err) => {
        negativeLog(`ERROR IN PEER CONNECTION TO ${userID}`)
        console.error(err)
      })

      // #region connection successfull
      peers[userID]!.peer.on('connect', () => {
        peers[userID] = { peer }

        if (otherStatues.players.count === 1 && otherStatues.isFirstMatch) {
          otherStatues.players.info[userID] = {
            isPainter: true,
          }

          otherStatues.isFirstMatch = false
          updatePaintersToPlayers(
            playersIDsOrderedByTimestamp.value[0]!,
            playersIDsOrderedByTimestamp.value[1]!,
            peers,
          )
          otherStatues.players.secondPainterIndex = 1

          otherStatues.matchTimeout = createMatchTimeout(
            painterData,
            otherStatues,
            playersIDsOrderedByTimestamp,
            peers,
          )
        } else if (otherStatues.players.count !== 1) {
          otherStatues.players.info[userID] = {
            isPainter: false,
            isGuessed: false,
          }
        }

        updatePlayersIDs(playersIDsOrderedByTimestamp, peers)
        otherStatues.players.count++

        positiveLog(`CONNECTED TO ${userID}`)
      })
      // #endregion

      // #region connection close
      peers[userID]!.peer.on('close', () => {
        delete peers[userID]
        updatePlayersIDs(playersIDsOrderedByTimestamp, peers)
        otherStatues.players.count--

        if (otherStatues.players.info[userID]!.isPainter) {
          otherStatues.players.secondPainterIndex = 0
        }

        negativeLog(`CONNECTION TO ${userID} CLOSED`)
      })
      // #endregion
    })

    roomChannel.presence.enter()
    positiveLog(`YOU ENTERED THE ROOM ${roomID} >`)
  })
}
