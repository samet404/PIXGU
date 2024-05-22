import type SimplePeerType from 'simple-peer'
import type { User } from 'lucia'
import { useRef, useState } from 'react'
import { useAtomValue } from 'jotai'
import { ablyClientAtom } from '../../../../../../atoms'
import {
  useEnters,
  useOffers,
  useAnswers,
  useLeaves,
  useMyLeave,
} from './hooks'
import type { DrawData } from '@/types'

/**
 * This hook handles the WebRTC peer connections.
 *
 * @param user - The user object
 * @param roomID - The room's ID
 */
export const useHandlePeers = (user: User, roomID: string) => {
  console.log('CONNECTING TO PEERS...')

  const [isSuccess, setIsSuccess] = useState<boolean>(false)
  const peersRef = useRef<PeersRefCurrent>()
  const drawDataRef = useRef<DrawData>()
  const ablyClient = useAtomValue(ablyClientAtom)!
  const myID = user.id
  const roomChannel = ablyClient.channels.get(`room:${roomID}`)
  const myConnectChannel = ablyClient.channels.get(
    `room:${roomID}:connect:${myID}`,
  )

  useEnters({ ablyClient, peersRef, myID, roomID, user, roomChannel })
  useOffers({ ablyClient, myConnectChannel, peersRef, myID, roomID, user })
  useAnswers({ myConnectChannel, peersRef })
  useLeaves({ roomChannel, peersRef })
  useMyLeave({ roomChannel, myConnectChannel, peersRef })

  setIsSuccess(true)

  return {
    peersRef,
    drawDataRef,
    isSuccess,
  }
}

type PeersRefCurrent = Partial<
  Record<UserID, { peer: SimplePeerType.Instance }>
>
type UserID = string
