import { useHostPeer } from '@/zustand/store/useHostPeer'
import { Status } from './Status'
import { firstLetterUppercase } from '@/utils'
import { useEffect } from 'react'

export const HostConnection = () => {
  const status = useHostPeer((state) => state.status)

  const theme = (() => {
    if (status === 'connected') return 'green'
    if (status === 'connecting') return 'yellow'
    return 'red'
  })()

  // useEffect(() => {
  //   // if connecting takes too long, set status to failed
  //   if (status !== 'connecting') return
  //   const timeout = setTimeout(() => {
  //     useHostPeer.getState().set({
  //       status: 'failed',
  //     })
  //   }, 20000)

  //   return () => clearTimeout(timeout)
  // }, [status])

  return <Status text={firstLetterUppercase(status)} theme={theme} />
}
