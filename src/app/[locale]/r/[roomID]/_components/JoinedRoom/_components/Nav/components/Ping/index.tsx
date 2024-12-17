'use client'

import { usePing } from '@/zustand/store/usePing'
import { Status } from '../Status'
import { useHostPeer } from '@/zustand/store/useHostPeer'

export const Ping = () => {
  const ping = usePing((state) => state.ping)
  const hostConnectionStatus = useHostPeer((state) => state.status)

  if (!ping) return null

  const theme = (() => {
    switch (hostConnectionStatus) {
      case 'failed':
        return 'red'
      case 'connecting':
        return 'yellow'
      case 'finding host':
        return 'bright yellow'
    }

    if (ping < 50) return 'green'
    if (ping < 100) return 'yellow'
    return 'red'
  })()

  const text = (() => {
    switch (hostConnectionStatus) {
      case 'failed':
        return '-'
      case 'connecting':
        return '-'
      case 'finding host':
        return '-'
      default:
        return typeof ping === 'number' ? `${(ping).toFixed(1)}ms` : 'Calculating...'
    }
  })()

  return <Status text={text} theme={theme} />
}
