'use client'

import { useHandlePeers, useMyOffline } from './hooks'

/**
 * This component is responsible for connecting to peers.
 * Don't forget to wrap this component with dynamic import and set ssr to false.
 */
export const ConnectToPeers = () => {
  useHandlePeers()
  useMyOffline()
  return null
}
