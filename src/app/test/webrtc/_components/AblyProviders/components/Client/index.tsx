'use client'

import { Fragment, useRef } from 'react'
import type Peer from 'peerjs'
import { type DataConnection } from 'peerjs'
import { type RealtimeChannel, type PresenceMessage, type Realtime } from 'ably'
import { useMyPeer } from '@/hooks/useMyPeer'
import { subscribeAblyPresence } from '@/utils/subscribeAblyPresence'
import { type OverrideProps } from '@/types/overrideProps'
import dynamic from 'next/dynamic'
import { remPeerID } from '@/app/test/webrtc/actions/remPeerID'
import { setPeerID } from '@/app/test/webrtc/actions/setPeerID'

const ConnectOthers = dynamic(() => import('./components/ConnectOthers'), {
  ssr: false,
})

const Input = dynamic(() => import('./components/Input'), {
  ssr: false,
})

const Client = ({ client }: { client: Realtime }) => {
  console.log('rerendered client')
  const conns = useRef<DataConnection[] | null>(null)
  const channel = useRef(client.channels.get('webrtctest'))

  const { myPeer } = useMyPeer({ secure: false }, (peer) =>
    afterMyPeerInıt(channel.current, peer),
  )

  if (!myPeer) return <div className="text-white">Loading...</div>

  if (myPeer)
    return (
      <Fragment>
        <Input conns={conns} myPeer={myPeer} />
        <ConnectOthers
          channel={channel.current}
          connectionID={client.connection.id!}
          myPeer={myPeer}
          conns={conns}
        />
      </Fragment>
    )
}

export default Client

const afterMyPeerInıt = (channel: RealtimeChannel, peer: Peer) => {
  peer.once('open', () => {
    channel.presence.enter({
      peerID: peer.id,
    })

    subscribeAblyPresence(
      channel,
      'enter',
      (msg: OverrideProps<PresenceMessage, { data: { peerID: string } }>) => {
        const { peerID } = msg.data

        if (msg.data.peerID !== peer.id) {
          console.log(`${msg.data.peerID} enter channel`)
          setPeerID(peerID)
        }
      },
    )

    subscribeAblyPresence(
      channel,
      'leave',
      (msg: OverrideProps<PresenceMessage, { data: { peerID: string } }>) => {
        const { peerID } = msg.data

        if (peerID !== peer.id) {
          console.log(`${msg.data.peerID} leave channel`)
          remPeerID(peerID)
        }
      },
    )
  })
}
