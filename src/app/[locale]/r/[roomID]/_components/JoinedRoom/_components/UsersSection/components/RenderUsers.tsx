'use client'

import { useAblyTokenClient } from '@/hooks/useAblyTokenClient'
import dynamic from 'next/dynamic'
import { useState } from 'react'

const User = dynamic(() => import('./User'))

const RenderUsers = () => {
  const {ablyClient} = useAblyTokenClient()

  const channel = ablyClient.current.channels.get('')
    channel.presence.get((err, members) => {
        members.map((member) => {
            member.
        })
    })

  const players = useState<Players>()

  if (!players) return null
  return players.map((u, i) => {
    return <User key={i} name={p.} profilePicture={p.pfp} />
  })
}

export default RenderUsers

type Players = {
  ID: string
  name: string
  pfp: string | null
}[]
