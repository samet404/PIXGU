import type SimplePeerType from 'simple-peer'
import { useRef, useState } from 'react'
import { useAtomValue, useSetAtom } from 'jotai'
import { ablyClientAtom } from '../../../../../../atoms'
import { setPlayerAtom, removePlayerAtom } from '../../../../../../../../_atoms'
import { subscribeAblyPresence } from '@/utils'
import { simplePeer } from '@/utils/simplePeer'
import { type Message } from 'ably'
import { decodedOnPeerData } from '@/utils/decodedOnPeerData'
import type { WebRTCConnData, SignalData, UserID } from '../../types'
import type { User } from 'lucia'
import { useEffectOnce } from '@/hooks/useEffectOnce'

export const useConnectPeers = (user: User, roomID: string) => {
  console.log(`user:`, user)
  console.log(`roomID:`, roomID)

  const [isSuccess, setIsSuccess] = useState<boolean>(false)
  const [err, setErr] = useState<{ name: string; message: string } | null>(null)

  const peersRef = useRef<Record<UserID, { peer: SimplePeerType.Instance }>>()
  console.log(`peersRef:`, peersRef)

  const setPlayer = useSetAtom(setPlayerAtom)
  const removePlayer = useSetAtom(removePlayerAtom)
  const ablyClient = useAtomValue(ablyClientAtom)!
  console.log(`ablyClient:`, ablyClient)
  const roomChannel = ablyClient.channels.get(`room:${roomID}`)

  useEffectOnce(() => {
    console.log('useEffectOnce  ')
    try {
      console.log('CONNECTING TO PEERS...')
      const myID = user.id
      const enterData = { userID: myID }
      console.log(`myID:`, myID)

      subscribeAblyPresence(roomChannel, 'enter', (msg: Message) => {
        const { userID } = msg.data as typeof enterData
        console.log(`USER ${userID} ENTERED`)

        if (userID === myID) return null

        console.log(`INITIATING PEER CONNECTION TO ${userID}`)

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
          console.log(`SIGNALING TO ${userID}`)
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
              name: user.usernameWithUsernameID,
              pfp: user.profilePicture,
            },
          }

          console.log(`meetInfo:`, meetInfo)
          peer.send(JSON.stringify(meetInfo))
        })

        decodedOnPeerData(peer, (data) => {
          const dataJSON: WebRTCConnData = JSON.parse(data)
          if (dataJSON.event === 'meet') setPlayer(dataJSON.userInfo)
        })

        peer.on('data', (data) => console.log(data))
      })

      const myConnectChannel = ablyClient.channels.get(
        `room:${roomID}:connect:${myID}`,
      )

      myConnectChannel.subscribe('offer', (msg: Message) => {
        const { userID, signal } = msg.data as SignalData
        console.log(`OFFER RECEIVED FROM ${userID}`)

        const peer = simplePeer()

        console.log('peer for offer')
        console.log(peer)

        const themConnectChannel = ablyClient.channels.get(
          `room:${roomID}:connect:${userID}`,
        )

        peer.on('signal', (data) => {
          themConnectChannel.publish('answer', {
            userID: myID,
            signal: data,
          })
        })

        peer.signal(signal)

        peer.on('error', (e) => {
          setErr({
            name: e.name,
            message: e.message,
          })
        })

        peer.on('connect', () => {
          console.log(`CONNECTED TO ${userID}`)

          const meetInfo: WebRTCConnData = {
            event: 'meet',
            userInfo: {
              id: myID,
              name: user.usernameWithUsernameID,
              pfp: user.profilePicture,
            },
          }

          peer.send(JSON.stringify(meetInfo))
        })

        decodedOnPeerData(peer, (data) => {
          const dataJSON: WebRTCConnData = JSON.parse(data)
          if (dataJSON.event == 'meet') setPlayer(dataJSON.userInfo)
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
        console.log(`ANSWER RECEIVED FROM ${userID}`)

        peersRef.current![userID]!.peer.signal(signal)
      })

      subscribeAblyPresence(roomChannel, 'leave', (msg: Message) => {
        const { userID } = msg.data as typeof enterData

        peersRef.current![userID]!.peer.destroy()
        delete peersRef.current![userID]
        removePlayer(userID)
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
  })

  return {
    peersRef,
    isSuccess,
    err,
  }
}
