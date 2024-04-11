import { useEffectOnce } from '@/hooks/useEffectOnce'
import { type OverrideProps } from '@/types/overrideProps'
import { subscribeAblyPresence } from '@/utils/subscribeAblyPresence'
import { type PresenceMessage, type RealtimeChannel } from 'ably'
import type Peer from 'peerjs'
import { type DataConnection } from 'peerjs'
import { type MutableRefObject, useState } from 'react'
// import { setPeerID } from '../../../actions/setPeerID'

type EnterProps = {
  channel: RealtimeChannel
  connectionID: string
  conns: MutableRefObject<DataConnection[] | null>
  myPeer: Peer
}

const Enter = ({ channel, connectionID, conns, myPeer }: EnterProps) => {
  console.log('rerendered entered')
  const [logs, setLogs] = useState<
    {
      peerID: string
    }[]
  >([])

  useEffectOnce(() => {
    channel.presence.enter({
      peerID: myPeer.id,
    })
  })

  subscribeAblyPresence(
    channel,
    'enter',
    (msg: OverrideProps<PresenceMessage, EnterChannelMessageData>) => {
      // setPeerID(msg.data.peerID)s

      if (msg.data.peerID !== myPeer.id) {
        console.log(`${msg.data.peerID} enter channel`)
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
