import type SimplePeerType from 'simple-peer'
import { useEffect, useRef, useState } from 'react'
import { useAtomValue, useSetAtom } from 'jotai'
import { api } from '@/trpc/react'
import { ablyClientAtom } from '../../../../atoms'
import { setPlayerAtom } from '@/app/r/[roomID]/_components/JoinedRoom/_atoms'
import { subscribeAblyPresence } from '@/utils'
import { simplePeer } from '@/utils/simplePeer'
import { type Message } from 'ably'
import { decodedOnPeerData } from '@/utils/decodedOnPeerData'
import type { WebRTCConnData, SignalData, UserID } from '../../types'
import { useLastPartOfPathname } from '@/hooks'

export const useConnectPeers = () => {
  const [isSuccess, setIsSuccess] = useState<boolean>(false)
  const [err, setErr] = useState<{ name: string; message: string } | null>(null)

  const peersRef = useRef<Record<UserID, { peer: SimplePeerType.Instance }>>()

  const setPlayer = useSetAtom(setPlayerAtom)
  const ablyClient = useAtomValue(ablyClientAtom)!
  const roomID = useLastPartOfPathname()
  const roomChannel = ablyClient.channels.get(`room:${roomID}`)

  const myUserInfo = api.auth.getUser.useQuery(undefined, {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  })

  useEffect(() => {
    try {
      if (!myUserInfo.data || err || isSuccess) return void null
      const myID = myUserInfo.data.id
      const myName = myUserInfo.data.usernameWithUsernameID
      const myPfp = myUserInfo.data.profilePicture

      const enterData = { userID: myID }

      subscribeAblyPresence(roomChannel, 'enter', (msg: Message) => {
        const { userID } = msg.data as typeof enterData

        if (userID === myID) return null

        const peer = simplePeer({
          initiator: true,
        })

        peersRef.current = {
          [userID]: { peer: peer },
          ...peersRef.current,
        }

        const themConnectChannel = ablyClient.channels.get(
          `room:${roomID}:connect:${userID}`,
        )

        peer.on('signal', (data) => {
          themConnectChannel.publish('offer', {
            userID: myID,
            signal: data,
          })
        })

        peer.on('connect', () => {
          console.log(`CONNECTED TO ${userID}`)

          const meetInfo: WebRTCConnData = {
            event: 'meet',
            userInfo: {
              id: myID,
              name: myName,
              pfp: myPfp,
            },
          }

          peer.send(JSON.stringify(meetInfo))
        })

        decodedOnPeerData(peer, (data: WebRTCConnData) => {
          if (data.event === 'meet') setPlayer(data.userInfo)
        })
      })

      const myConnectChannel = ablyClient.channels.get(
        `room:${roomID}:connect:${myID}`,
      )

      myConnectChannel.subscribe('offer', (msg: Message) => {
        const { userID, signal } = msg.data as SignalData

        const peer = simplePeer()

        peer.signal(signal)

        const themSignalingChannel = ablyClient.channels.get(
          `simple-peer:signal:${userID}`,
        )

        peer.on('signal', (data) => {
          themSignalingChannel.publish('answer', {
            userID: myID,
            signal: data,
          })
        })

        peer.on('connect', () => {
          console.log(`CONNECTED TO ${userID}`)

          const meetInfo: WebRTCConnData = {
            event: 'meet',
            userInfo: {
              id: myID,
              name: myName,
              pfp: myPfp,
            },
          }

          peer.send(JSON.stringify(meetInfo))
        })

        decodedOnPeerData(peer, (data: WebRTCConnData) => {
          if (data.event === 'meet') setPlayer(data.userInfo)
        })

        peer.on('error', (e) => {
          setErr({
            name: e.name,
            message: e.message,
          })
        })

        peersRef.current = {
          [userID]: { peer: peer },
          ...peersRef.current,
        }
      })

      myConnectChannel.subscribe('answer', (msg: Message) => {
        const { userID, signal } = msg.data as SignalData

        peersRef.current![userID]!.peer.signal(signal)
      })

      subscribeAblyPresence(roomChannel, 'leave', (msg: Message) => {
        const { userID } = msg.data as typeof enterData

        peersRef.current![userID]!.peer.destroy()
        delete peersRef.current![userID]
      })

      roomChannel.presence.enter(enterData)

      setIsSuccess(true)
    } catch (e) {
      if (e instanceof Error)
        setErr({
          name: e.name,
          message: e.message,
        })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [myUserInfo.isSuccess])

  return {
    peersRef,
    isSuccess,
    err,
  }
}
