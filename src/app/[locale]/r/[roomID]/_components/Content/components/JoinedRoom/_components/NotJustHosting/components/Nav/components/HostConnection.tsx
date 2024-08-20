import { useHostPeer } from '@/zustand/store/useHostPeer'
import { Status } from './Status'
import { firstLetterUppercase } from '@/utils'

export const HostConnection = () => {
  const status = useHostPeer((state) => state.status)

  const theme = (() => {
    if (status === 'connected') return 'green'
    if (status === 'connecting') return 'yellow'
    return 'red'
  })()

  return <Status text={firstLetterUppercase(status)} theme={theme} />
}
