import { Fragment } from 'react'
import dynamic from 'next/dynamic'
import { HostingHealthDisplay } from './components/HostingHealthDisplay'

const ConnectToPeers = dynamic(() => import('./components/ConnectToPeers'), {
  ssr: false,
})

export const JustHosting = () => {
  return (
    <Fragment>
      <ConnectToPeers />

      <HostingHealthDisplay />
    </Fragment>
  )
}
