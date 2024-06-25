import type { Message } from 'ably'
import type { WebRTCSignalData } from '@/types'
import { subscribeAblyPresence } from '@/utils/subscribeAblyPresence'
import { simplePeer } from '@/utils/simplePeer'
import { useEffectOnce } from '@/hooks/useEffectOnce'
import { handlePeerDatas, addPeer } from './funcs'
import { useContext } from 'react'
import { positiveLog, negativeLog } from '@/utils'
import { useRoomPlayersIDsStore } from '@/zustand/store/useRoomPlayersIDsStore'
import { RoomPlayersIDsContext } from '@/context/client/react/roomPlayersIDsContext'
import {
  AblyClientContext,
  CanvasesMainDataContext,
  CanvasesPainterDataContext,
  PeersContext,
  RoomIDContext,
  UserIDContext,
} from '@/context/client'

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
  const canvasesMainData = useContext(CanvasesMainDataContext)!
  const canvasesPainterData = useContext(CanvasesPainterDataContext)!

  const playersIDsContext = useContext(RoomPlayersIDsContext)
  const updatePlayerIDState = useRoomPlayersIDsStore((s) => s.update)

  useEffectOnce(() => {
    const roomChannel = ablyClient.channels.get(`room:${roomID}`)

    // #region first updating playersIDs
    ;(async () => {
      const presenceSet = await roomChannel.presence.get()
      console.log(myUserID)
      console.log(presenceSet.filter((p) => p.clientId !== myUserID))
      const newPlayersIDs = presenceSet
        .filter(
          (p) =>
            p.clientId !== myUserID &&
            !playersIDsContext.value.includes(p.clientId),
        )
        .map((p) => p.clientId)

      playersIDsContext.value = newPlayersIDs
      updatePlayerIDState(newPlayersIDs)
    })()
    // #endregion

    subscribeAblyPresence(roomChannel, 'enter', async (msg: Message) => {
      const userID = msg.clientId!
      console.log(`myUserID: ${myUserID}`)
      if (userID === myUserID) {
        console.log('THIS IS ME!')
        return null
      }

      if (userID === myUserID) console.log('THIS IS STILL ME!')
      // #region update playersIDs
      const presenceSet = await roomChannel.presence.get()
      console.log(myUserID)
      console.log(presenceSet.filter((p) => p.clientId !== myUserID))
      const newPlayersIDs = presenceSet
        .filter(
          (p) =>
            p.clientId !== myUserID &&
            !playersIDsContext.value.includes(p.clientId),
        )
        .map((p) => p.clientId)

      playersIDsContext.value = newPlayersIDs
      updatePlayerIDState(newPlayersIDs)
      // #endregion

      positiveLog(`USER ${userID} ENTERED >`)
      positiveLog(`INITIATING PEER CONNECTION TO ${userID}`)

      // #region simple peer
      const themConnectChannel = ablyClient.channels.get(
        `room:${roomID}:connect:${userID}`,
      )
      const peer = simplePeer({
        initiator: true,
      })

      peer.on('signal', (data: WebRTCSignalData) => {
        console.log(`SIGNALING TO ${userID}`)
        themConnectChannel.publish('offer', data)
      })

      peer.on('error', (err) => {
        negativeLog(`ERROR IN PEER CONNECTION TO ${userID}`)
        console.error(err)
      })
      peer.on('connect', () => positiveLog(`CONNECTED TO ${userID}`))
      // #endregion

      peers[userID] = {
        peer,
        isPainter: false,
      }

      handlePeerDatas(peer, peers, canvasesMainData, canvasesPainterData)
      addPeer(userID, peers, peer)
    })

    roomChannel.presence.enter()
    positiveLog(`YOU ENTERED THE ROOM ${roomID} >`)
  })
}
