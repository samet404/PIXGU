import type { User } from 'lucia'
import { useRef, useState } from 'react'
import { useAtomValue } from 'jotai'
import { ablyClientAtom } from '../../../../../../atoms'
import type { CanvasData, Peers } from '@/types'
import {
  useEnters,
  useOffers,
  useAnswers,
  useLeaves,
  useMyLeave,
} from './hooks'

/**
 * This hook handles the everything about WebRTC peer connections.
 *
 * @param user - The user object
 * @param roomID - The room's ID
 */
export const useHandlePeers = (user: User, roomID: string) => {
  console.log('CONNECTING TO PEERS...')

  const [isSuccess, setIsSuccess] = useState<boolean>(false)
  const peersRef = useRef<Peers>({})
  const canvasDataRef = useRef<CanvasData>({
    cellPixelLength: 0,
    cellSideCount: 40,
    draft: null,
    main: null,
    painter: {
      isPainter: null,
      lastDrawedPixel: null,
      painting: null,
      pixelHistory: {},
    },
  })

  const ablyClient = useAtomValue(ablyClientAtom)!
  const myID = user.id
  const roomChannel = ablyClient.channels.get(`room:${roomID}`)
  const myConnectChannel = ablyClient.channels.get(
    `room:${roomID}:connect:${myID}`,
  )

  useEnters(ablyClient, peersRef, canvasDataRef, myID, roomID, roomChannel)
  useOffers(ablyClient, myConnectChannel, roomID, canvasDataRef, peersRef)
  useAnswers(myConnectChannel, peersRef)
  useLeaves(roomChannel, peersRef)
  useMyLeave(roomChannel, myConnectChannel, peersRef)

  setIsSuccess(true)

  return {
    peersRef,
    canvasDataRef,
    isSuccess,
  }
}
