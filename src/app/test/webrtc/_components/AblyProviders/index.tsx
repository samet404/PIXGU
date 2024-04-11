'use client'

import { createId } from '@paralleldrive/cuid2'
import { useAblyTokenClient } from '@/hooks/useAblyTokenClient'
import dynamic from 'next/dynamic'

const Client = dynamic(() => import('./components/Client'), {
  ssr: false,
  loading: () => <div className="text-white">Loading...</div>,
})

const AblyProviders = () => {
  const { ablyClient } = useAblyTokenClient({
    clientId: createId(),
  })

  return <Client client={ablyClient.current} />
}
export default AblyProviders
