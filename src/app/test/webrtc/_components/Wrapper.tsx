'use client'

import { createId } from '@paralleldrive/cuid2'
import { Fragment } from 'react'
import dynamic from 'next/dynamic'
import { useAblyTokenClient } from '@/hooks/useAblyTokenClient'

const AblyProviders = dynamic(() => import('./AblyProviders'), {
  ssr: false,
})

const Client = dynamic(() => import('./Client'), { ssr: false })

const Wrapper = () => {
  const ablyClient = useAblyTokenClient({
    clientId: createId(),
  })

  return (
    <Fragment>
      <Client client={ablyClient.current} />
    </Fragment>
  )
}
export default Wrapper
