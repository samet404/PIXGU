'use client'

import { useHostPeer } from '@/zustand/store/useHostPeer'
import { Status } from './Status'
import type { LangObj } from '../../../lang'

export const HostConnection = ({ langObj }: Props) => {
  const status = useHostPeer((state) => state.status)
  const { connecting, connected, disconnected, failed, findingHost } = langObj

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
      case 'finding host':
        return 'bright yellow'
    }
  })()

  const displayText = (() => {
    switch (status) {
      case 'connected':
        return connected
      case 'failed':
        return failed
      case 'disconnected':
        return disconnected
      case 'connecting':
        return connecting
      case 'finding host':
        return findingHost
    }
  })()

  return <Status text={displayText} theme={theme} />
}

type Props = {
  langObj: LangObj['nav']['hostConnection']
}