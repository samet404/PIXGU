'use client'

import { type OverrideProps } from '@/types/overrideProps'
import { subscribeAblyPresence } from '@/utils/subscribeAblyPresence'
import { type PresenceMessage, type RealtimeChannel } from 'ably'
import type Peer from 'peerjs'
import { type DataConnection } from 'peerjs'
import { type MutableRefObject, useRef, useState } from 'react'
// import { remPeerID } from '../../../actions/remPeerID'

type LeaveProps = {
  channel: RealtimeChannel
  connectionID: string
  conns: MutableRefObject<DataConnection[] | null>
  myPeer: Peer
}

const Leave = ({ channel, connectionID, conns, myPeer }: LeaveProps) => {
  console.log('rerendered left')
  const [logs, setLogs] = useState<
    {
      peerID: string
    }[]
  >([])

  // const callRemPeerID = (peerID: string) => remPeerID(peerID)

  subscribeAblyPresence(
    channel,
    'leave',
    (msg: OverrideProps<PresenceMessage, LeaveChannelMessageData>) => {
      if (msg.data.peerID !== myPeer.id) {
        console.log(`${msg.data.peerID} left channel`)

        // callRemPeerID(msg.data.peerID)

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
