'use client'

import { Fragment, useRef } from 'react'
import { type DataConnection, Peer } from 'peerjs'
import { type Realtime } from 'ably'
import Enter from './Enter'
import Leave from './Leave'
import ConnectOthers from './ConnectOthers'
import Input from './Input'
import { iceServers } from '@/utils/_index'

const Client = ({ client }: { client: Realtime }) => {
  const conns = useRef<DataConnection[] | null>(null)
  const channel = useRef(client.channels.get('webrtctest'))
  const myPeer = useRef(
    new Peer('', {
      debug: 2,
      config: {
        iceServers: iceServers,
      },
    }),
  )

  myPeer.current.on('open', (peerID) => {
    console.log(`My peer ID is: ${peerID}`)

    channel.current.presence.enter({
      peerID: peerID,
    })
  })

  return (
    <Fragment>
      <Input conns={conns} myPeer={myPeer} />
      <ConnectOthers
        channel={channel.current}
        connectionID={client.connection.id!}
        myPeer={myPeer}
        conns={conns}
      />
      <Enter
        channel={channel.current}
        connectionID={client.connection.id!}
        conns={conns}
        myPeer={myPeer}
      />
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
