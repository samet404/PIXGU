'use client'

import { useAblyTokenClient } from '@/hooks/useAblyTokenClient'
import { useEffectOnce } from '@/hooks/useEffectOnce'
import { type PresenceMessage } from 'ably'
import { useRef, useState } from 'react'

const Client = () => {
  const { ablyClient } = useAblyTokenClient()
  const channel = useRef(ablyClient.current.channels.get('r'))

  useEffectOnce(() => {
    channel.current.presence.enter()
  })

  const [members, setMembers] = useState<Members>()
  ;(async () => {
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    await channel.current.presence.subscribe(async (presenceMsg) => {
      const presenceSet = await channel.current.presence.get()
      setMembers(presenceSet)
    })
  })()

  return (
    <div className="flex flex-col gap-2 text-white">
      {members
        ? members.map((member, i) => {
            return (
              <div key={i} className="flex flex-row gap-2">
                <div>{member.clientId}</div>
                <div>{member.connectionId}</div>
                <div>{member.data}</div>
                <div>{member.id}</div>
                <div>{member.timestamp}</div>
                <div>{member.extras}</div>
                <div>{member.action}</div>
                <div>{member.encoding}</div>
              </div>
            )
          })
        : null}
    </div>
  )
}

export default Client

type Members = PresenceMessage[]
