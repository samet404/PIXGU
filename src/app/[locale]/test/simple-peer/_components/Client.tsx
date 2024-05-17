'use client'

import { useAblyTokenClient } from '@/hooks/useAblyTokenClient'
import { isObjectEmpty } from '@/utils/isObjectEmpty'
import { simplePeer } from '@/utils/simplePeer'
import { subscribeAblyPresence } from '@/utils/subscribeAblyPresence'
import { createId } from '@paralleldrive/cuid2'
import type { Message } from 'ably'
import { useRef } from 'react'
import type SimplePeer from 'simple-peer'

const Client = () => {
  const myUserID = createId()
  const peers = useRef<Record<UserID, { peer: SimplePeer.Instance }>>()
  const { ablyClient } = useAblyTokenClient()
  const channel = ablyClient.current.channels.get('simple-peer')
  const enterData = { userID: myUserID }

  channel.presence.enter(enterData)
  subscribeAblyPresence(channel, 'enter', (msg: Message) => {
    const { userID } = msg.data as typeof enterData

    if (userID === myUserID) return null

    const peer = simplePeer({
      initiator: true,
    })

    peers.current = {
      [userID]: { peer: peer },
      ...peers.current,
    }

    const channel = ablyClient.current.channels.get(
      `simple-peer:signal:${userID}`,
    )

    peer.on('signal', (data) => {
      channel.publish('offer', {
        userID: myUserID,
        signal: data,
      })
    })

    peer.on('connect', () => {
      console.log('CONNECTED')
    })

    peer.on('data', (data) => {
      let txt = new TextDecoder('utf-8').decode(data)
      console.log(txt)
    })
  })

  const signalingChannel = ablyClient.current.channels.get(
    `simple-peer:signal:${myUserID}`,
  )

  signalingChannel.subscribe('offer', (msg: Message) => {
    const { userID, signal } = msg.data as SignalData

    const peer = simplePeer()
    peer.signal(signal)

    const themSignalingChannel = ablyClient.current.channels.get(
      `simple-peer:signal:${userID}`,
    )

    peer.on('signal', (data) => {
      themSignalingChannel.publish('answer', {
        userID: myUserID,
        signal: data,
      })
    })

    peer.on('connect', () => {
      console.log('CONNECTED')
    })

    peer.on('data', (data) => {
      let txt = new TextDecoder('utf-8').decode(data)
      console.log(txt)
    })

    peers.current = {
      [userID]: { peer: peer },
      ...peers.current,
    }
  })

  signalingChannel.subscribe('answer', (msg: Message) => {
    const { userID, signal } = msg.data as SignalData

    peers.current![userID]!.peer.signal(signal)
  })

  subscribeAblyPresence(channel, 'leave', (msg: Message) => {
    const { userID } = msg.data as typeof enterData

    peers.current![userID]!.peer.destroy()
    delete peers.current![userID]
  })

  return (
    <div className="flex flex-col">
      <textarea
        cols={30}
        rows={10}
        onChange={(e) => {
          const isPeersEmpty = isObjectEmpty(peers.current)
          if (isPeersEmpty) return null

          for (const userID in peers.current) {
            const peer = peers.current[userID]?.peer
            if (!peer) return null

            peer.send(e.target.value)
          }
        }}
      ></textarea>
    </div>
  )
}

export default Client

type UserID = string

type SignalData = {
  userID: UserID
  signal: SimplePeer.SignalData
}
