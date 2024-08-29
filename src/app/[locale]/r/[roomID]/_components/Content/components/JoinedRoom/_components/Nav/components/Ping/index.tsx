import { usePing } from '@/zustand/store/usePing'
import { Status } from '../Status'
import { useHostPeer } from '@/zustand/store/useHostPeer'

export const Ping = () => {
  const ping = usePing((state) => state.ping)
  const hostConnectionStatus = useHostPeer((state) => state.status)

  const theme = (() => {
    if (hostConnectionStatus === 'failed') return 'red'
    if (hostConnectionStatus === 'connecting') return 'yellow'
    if (ping < 50) return 'green'
    if (ping < 100) return 'yellow'
    return 'red'
  })()

  const text = (() => {
    if (
      hostConnectionStatus === 'failed' ||
      hostConnectionStatus === 'connecting'
    )
      return '-'
    return `${ping}ms`
  })()

  return <Status text={text} theme={theme} />
}
