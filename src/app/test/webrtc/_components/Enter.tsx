import { type OverrideProps } from '@/types/overrideProps'
import { subscribeAblyPresence } from '@/utils/subscribeAblyPresence'
import { type PresenceMessage, type RealtimeChannel } from 'ably'
import type Peer from 'peerjs'
import { type DataConnection } from 'peerjs'
import { type MutableRefObject, useState } from 'react'
import { setPeerID } from '../actions/setPeerID'
import { useTimeout } from 'usehooks-ts'

type EnterProps = {
  channel: RealtimeChannel
  connectionID: string
  conns: MutableRefObject<DataConnection[] | null>
  myPeer: MutableRefObject<Peer>
}

const Enter = ({ channel, connectionID, conns, myPeer }: EnterProps) => {
  console.log('rerendered entered')
  const [logs, setLogs] = useState<
    {
      peerID: string
    }[]
  >([])

  subscribeAblyPresence(
    channel,
    'enter',
    (msg: OverrideProps<PresenceMessage, EnterChannelMessageData>) => {
      setPeerID(msg.data.peerID)

      if (msg.connectionId !== connectionID) {
        console.log(`${msg.data.peerID} enter channel`)

        setLogs([...logs, { peerID: msg.data.peerID }])
      }
    },
  )

  return (
    <div className="flex flex-col-reverse gap-1 text-white">
      {logs.map((item, index) => (
        <div key={index}>{item.peerID} entered</div>
      ))}
    </div>
  )
}

type EnterChannelMessageData = {
  data: {
    peerID: string
  }
}

export default Enter
