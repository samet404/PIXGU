'use client'

import { useHostPeer } from '@/zustand/store/useHostPeer'
import { Status } from './Status'
import { firstLetterUppercase } from '@/utils'

export const HostConnection = () => {
  const status = useHostPeer((state) => state.status)

  const theme = (() => {
    switch (status) {
      case 'connected':
        return 'green'
      case 'failed':
        return 'red'
      case 'disconnected':
        return 'red'
      case 'connecting':
        return 'yellow'
      case 'host not found':
        return 'bright yellow'
    }
  })()

  return <Status text={firstLetterUppercase(status)} theme={theme} />
}
