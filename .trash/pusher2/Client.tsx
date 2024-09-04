'use client'

import { useSoketiClient } from '@/context/client/react'
import { useEffectOnce } from '@/hooks/useEffectOnce'
import { useState } from 'react'

export const Client = () => {
  const [text, setText] = useState<string>()
  const soketiClient = useSoketiClient()

  useEffectOnce(() => {
    const channel = soketiClient.subscribe('hello')

    channel.bind('my-event', (data: string) => setText(data))

    const channel2 = soketiClient.subscribe('hello')

    channel2.bind('my-event', (data: string) => setText(data))

    return () => {
      channel.unsubscribe()
    }
  })

  return <div className="flex flex-col gap-2 text-white">{text}</div>
}
