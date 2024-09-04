'use client'

import { AblyClientContext } from '@/context/client'
import { useContext } from 'react'
import { useInterval } from 'usehooks-ts'

const Client = () => {
  const ablyClient = useContext(AblyClientContext)!

  const channel = ablyClient.channels.get('test')
  channel.subscribe('test', (message) => console.log(message.data))

  useInterval(() => {
    ablyClient.clientId = '2313'
    console.log(ablyClient.clientId)
  }, 4000)

  console.log(ablyClient.auth.clientId)

  return <div className="text-white">{ablyClient.connection.state}</div>
}

export default Client
