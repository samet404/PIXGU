import { goldLog } from '@/utils'
import { useEnters, useOffers, useLeaves, useMyLeave } from './hooks'
import { AblyClientContext, RoomIDContext } from '@/context/client'
import { useContext } from 'react'

/**
 * This hook handles the everything about WebRTC peer connections.
 */
export const useHandlePeers = () => {
  goldLog('CONNECTING TO HOST...')
  const ablyClient = useContext(AblyClientContext)!
  const roomID = useContext(RoomIDContext)
  const roomChannel = ablyClient.channels.get(`room:${roomID}`)
  /*

  Proccess of WebRTC peer connection:
    
    1- New user enters the room (useEnters)
    2- Prev users sends an offer to the user (useEnters)
    3- New user gets the offer and sends an answer to the other (useOffers)
    4- Prev users gets answer (useAnswers)
    5- Connection is established or failed

    if other users leaves the room, the user is removed from the peers list or vice versa(useLeaves, useMyLeave)
  */

  useEnters()
  useOffers()
  useLeaves()
  useMyLeave()

  roomChannel.presence.enter()
}
