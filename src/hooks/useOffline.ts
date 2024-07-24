import { useIsOnlineStore } from '@/zustand/store/useIsOnlineStore'
import { useEventListener } from './useEventListener'

/**
 * useOffline hook
 *
 * This hook changes zustand offline state when the user goes offline
 */
export const useOffline = () => {
  const { change } = useIsOnlineStore()
  useEventListener(window, 'offline', () => change(false))
  useEventListener(window, 'online', () => change(true))
}
