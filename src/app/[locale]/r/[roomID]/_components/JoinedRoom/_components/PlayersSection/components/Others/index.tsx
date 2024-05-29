'use client'

import { useAblyTokenClient } from '@/hooks/useAblyTokenClient'
import { useEffectOnce } from '@/hooks/useEffectOnce'
import { subscribeAblyPresence } from '@/utils/subscribeAblyPresence'
import { type RealtimeChannel } from 'ably'
import { useRef, useState } from 'react'
import dynamic from 'next/dynamic'

const Other = dynamic(() => import('./components/Other'))

const Others = ({ roomID, userID }: Props) => {
  const { ablyClient } = useAblyTokenClient()
  const roomChannel = useRef<RealtimeChannel>(
    ablyClient.current.channels.get(`room:${roomID}`),
  )
  const [playersIDs, setPlayersIDs] = useState<string[]>([])

  useEffectOnce(() => {
    subscribeAblyPresence(roomChannel.current, 'enter', async () => {
      const presenceSet = await roomChannel.current.presence.get()

      const newPlayersIDs = presenceSet
        .filter((p) => p.clientId !== userID)
        .map((p) => p.clientId)

      setPlayersIDs((prev) => [...prev, ...newPlayersIDs])
    })
  })

  return playersIDs.map((ID) => <Other key={ID} ID={ID} />)
}

export default Others

type Props = {
  userID: string
  roomID: string
}
