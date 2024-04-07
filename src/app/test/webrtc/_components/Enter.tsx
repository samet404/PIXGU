import { api } from '@/trpc/react'
import { type OverrideProps } from '@/types/overrideProps'
import { subscribeAblyPresence } from '@/utils/subscribeAblyPresence'
import { type PresenceMessage, type RealtimeChannel } from 'ably'
import { useRef, useState } from 'react'

type EnterProps = {
  channel: RealtimeChannel
  connectionID: string
}

const Enter = ({ channel, connectionID }: EnterProps) => {
  console.log('rerendered entered')
  const tempLog = useRef<{ peerID: string }>()
  const [logs, setLogs] = useState<
    {
      peerID: string
    }[]
  >([])
  
    const {mutate} = api.gameRoom.remPeerID.useMutation({
      onSuccess: () => {
        setLogs([...logs, tempLog.current!])
      }
    })
    

  subscribeAblyPresence(
    channel,
    'enter',
    (msg: OverrideProps<PresenceMessage, EnterChannelMessageData>) => {
      if (msg.connectionId !== connectionID) {
        console.log(`${msg.data.peerID} enter channel`)

        tempLog.current = {
          peerID: msg.data.peerID
        }

        mutate({
          peerID: msg.data.peerID,
          roomID: 'test'
        })
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
