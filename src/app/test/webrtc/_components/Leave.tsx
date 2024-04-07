"use client"

import { api } from '@/trpc/react'
import { type OverrideProps } from '@/types/overrideProps'
import { subscribeAblyPresence } from '@/utils/subscribeAblyPresence'
import { type PresenceMessage, type RealtimeChannel } from 'ably'
import { useRef, useState } from 'react'

type LeaveProps = {
  channel: RealtimeChannel
  connectionID: string
}

const Leave = ({ channel, connectionID }: LeaveProps) => {
  console.log('rerendered left')
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
    (msg: OverrideProps<PresenceMessage, LeaveChannelMessageData>) => {
      if (msg.connectionId !== connectionID) {
        console.log(`${msg.data.peerID} left channel`)

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
