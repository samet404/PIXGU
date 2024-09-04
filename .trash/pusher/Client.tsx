'use client'

import { useSoketiClient } from '@/context/client/react'
import { useEffectOnce } from '@/hooks/useEffectOnce'
import { useRef, useState } from 'react'
import { useInterval } from 'usehooks-ts'

export const Client = () => {
  const [text, setText] = useState<string>()
  const soketiClient = useSoketiClient()
  const countRef = useRef(0)

  useEffectOnce(() => {
    const channel = soketiClient.subscribe('private-hello')

    channel.bind('my-event', (data: string) => setText(data))

    const channel2 = soketiClient.subscribe('hello')

    const channel3 = soketiClient.subscribe('presence-private-hello')
    channel3.bind('pusher:subscription_succeeded', (members: any) => {
      console.log('members', members)
    })

    channel3.bind('pusher:member_added', (member: any) => {
      console.log('member added', member)
    })

    channel2.bind('my-event', (data: string) => setText(data))

    return () => {
      channel.unsubscribe()
    }
  })

  useInterval(() => countRef.current++, 1000)

  return (
    <div className="flex flex-col gap-2 text-white">
      {text} {countRef.current}
    </div>
  )
}
