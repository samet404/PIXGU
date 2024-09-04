import { api } from '@/trpc/server'
import { ablyBasicClient } from '@/utils/ablyBasicClient'
import dynamic from 'next/dynamic'

const Client = dynamic(() => import('./Client'), { ssr: false })

const Presence = async () => {
  const userID = await api.auth.getUserID.query()
  const { ablyClient } = await ablyBasicClient({
    clientId: userID,
  })

  //   ablyClient.channels.get('r').presence.enter('data')

  return <Client />
}

export default Presence
