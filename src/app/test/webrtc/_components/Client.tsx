'use client'

import { Fragment, useRef } from 'react'
import { Peer } from 'peerjs'
import { type Realtime, type Message, type PresenceMessage } from 'ably'
import { subscribeAblyPresence } from '@/utils/subscribeAblyPresence'
import { OverrideProps } from '@/types/overrideProps'
import Enter from './Enter'
import Leave from './Leave'
import { api } from '@/trpc/react'

const Client = ({ client }: { client: Realtime }) => {
  const peerIDs = api.gameRoom.getPeerIDs.useQuery({
    roomID: 'test',
  }, {
    enabled: false,
  })

  const channel = client.channels.get('webrtctest', {
    
  })

  channel.subscribe((message: Message) => {
    console.log(`${message.clientId}: ${message.data}`)
  })

  console.log('rerendered')

  const myPeer = new Peer('', {
    debug: 2,
    config: {
      iceServers: [
        {
          urls: 'stun:stun.relay.metered.ca:80',
        },
        {
          urls: 'turn:global.relay.metered.ca:80',
          username: '1252ec2ff8cbf7bbe9612a4c',
          credential: 'fiFfxEzHiSroCZ9w',
        },
        {
          urls: 'turn:global.relay.metered.ca:80?transport=tcp',
          username: '1252ec2ff8cbf7bbe9612a4c',
          credential: 'fiFfxEzHiSroCZ9w',
        },
        {
          urls: 'turn:global.relay.metered.ca:443',
          username: '1252ec2ff8cbf7bbe9612a4c',
          credential: 'fiFfxEzHiSroCZ9w',
        },
        {
          urls: 'turns:global.relay.metered.ca:443?transport=tcp',
          username: '1252ec2ff8cbf7bbe9612a4c',
          credential: 'fiFfxEzHiSroCZ9w',
        },
      ],
    },
  })

  const inputRef = useRef<HTMLInputElement>(null)

  myPeer.on('open', (peerID) => {
    console.log(`My peer ID is: ${peerID}`)
    
    channel.presence.enter({
      peerID: peerID,
    })

    fetch('/api/game-room/webrtc/set-peerid', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        peerID: peerID,
        roomID: 'test',
      }),
    })

    peerIDs.refetch()
  })

  if (peerIDs.data) {
    peerIDs.data.forEach((peerID) => {
      if (peerID !== myPeer.id) {
        const conn = myPeer.connect(peerID)

        conn.on('open', () => {
          console.log(`Connected to ${peerID}`)
          conn.send('Hello!')
        })

        conn.on('data', (data: any) => {
          console.log(`Received data from ${peerID}: ${data.toString()}`)
        })
      }
    })
  }

  return (
    <Fragment>
      <input ref={inputRef} type="text" />
      <Enter channel={channel} connectionID={client.connection.id!} />
      <Leave channel={channel} connectionID={client.connection.id!} />
    </Fragment>
  )
}

type EnterChannelMessageData = {
  data: {
    peerID: string
  }
}

export default Client
