'use client'

import { Fragment, type MutableRefObject, useRef, useState } from 'react'
import type Peer from 'peerjs'
import { type DataConnection } from 'peerjs'
import { type PresenceMessage, type Realtime } from 'ably'

import { useMyPeer } from '@/hooks/useMyPeer'
import dynamic from 'next/dynamic'
import { subscribeAblyPresence } from '@/utils/subscribeAblyPresence'
import { type OverrideProps } from '@/types/overrideProps'

const Enter = dynamic(() => import('./components/Enter'), {
  ssr: false,
})

const Leave = dynamic(() => import('./components/Leave'), {
  ssr: false,
})

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

  const { myPeer } = useMyPeer(undefined, (myPeer) => {
    myPeer.on('open', () => {
      channel.current.presence.enter({
        peerID: myPeer.id,
      })

      subscribeAblyPresence(
        channel.current,
        'enter',
        (msg: OverrideProps<PresenceMessage, { data: { peerID: string } }>) => {
          // setPeerID(msg.data.peerID)s

          if (msg.data.peerID !== myPeer.id) {
            console.log(`${msg.data.peerID} enter channel`)
          }
        },
      )
    })
  })

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
        {/* <Enter
          channel={channel.current}
          connectionID={client.connection.id!}
          conns={conns}
          myPeer={myPeer as MutableRefObject<Peer>}
        /> */}
        <Leave
          channel={channel.current}
          connectionID={client.connection.id!}
          conns={conns}
          myPeer={myPeer}
        />
      </Fragment>
    )
}

export default Client
