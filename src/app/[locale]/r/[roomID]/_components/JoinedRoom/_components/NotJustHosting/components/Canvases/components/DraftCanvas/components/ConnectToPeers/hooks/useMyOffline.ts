import { AblyClientContext } from '@/context/client'
import { useEventListener } from '@/hooks/useEventListener'
import { useContext } from 'react'

/**
 * This hooks is used to handle when player is offline
 */
export const useMyOffline = () => {
  const ablyClient = useContext(AblyClientContext)

  useEventListener(window, 'offline', () => {
    alert('You are offline')
    ablyClient?.close()
  })

  useEventListener(window, 'online', () => {
    alert('You are online')
    ablyClient?.connect()
  })
}
