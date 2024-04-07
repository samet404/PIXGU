'use client'

import { createId } from '@paralleldrive/cuid2'
import { useAblyClient } from '@/hooks/useAblyClient'
import { Fragment } from 'react'
import Client from './Client'
import dynamic from 'next/dynamic'

const AblyProviders = dynamic(() => import('./AblyProviders'), {
  ssr: false,
})

const Wrapper = () => {
  const client = useAblyClient({
    clientId: createId(),
  })

  return (
    <Fragment>
      <Client client={client.current} />
    </Fragment>
  )
}
export default Wrapper
