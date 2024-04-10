'use client'

import { api } from '@/trpc/react'
import { type OverrideProps } from '@/types/overrideProps'
import { subscribeAblyPresence } from '@/utils/subscribeAblyPresence'
import { type PresenceMessage, type RealtimeChannel } from 'ably'
import Peer, { type DataConnection } from 'peerjs'
import { type MutableRefObject, useRef, useState } from 'react'
import { remPeerID } from '../actions/remPeerID'

type LeaveProps = {
  channel: RealtimeChannel
  connectionID: string
  conns: MutableRefObject<DataConnection[] | null>
  myPeer: MutableRefObject<Peer>
}

const Leave = ({ channel, connectionID, conns, myPeer }: LeaveProps) => {
  console.log('rerendered left')
  const tempLog = useRef<{ peerID: string } | null>()
  const [logs, setLogs] = useState<
    {
      peerID: string
    }[]
  >([])

  const callRemPeerID = (peerID: string) => remPeerID(peerID)

  subscribeAblyPresence(
    channel,
    'leave',
    (msg: OverrideProps<PresenceMessage, LeaveChannelMessageData>) => {
      if (msg.data.peerID !== myPeer.current.id) {
        console.log(`${msg.data.peerID} left channel`)

        callRemPeerID(msg.data.peerID)

        if (conns.current) {
          conns.current = conns.current.filter((conn) => {
            if (conn.peer === msg.data.peerID) {
              conn.close()

              return false
            }

            return true
          })

          return false
        }

        setLogs([...logs, { peerID: msg.data.peerID }])
      }
    },
  )

  return (
    <div className="flex flex-col-reverse gap-1 text-white">
      {logs.map((item, index) => (
        <div key={index}>{item.peerID} left</div>
      ))}
    </div>
  )
}

type LeaveChannelMessageData = {
  data: {
    peerID: string
  }
}

export default Leave
