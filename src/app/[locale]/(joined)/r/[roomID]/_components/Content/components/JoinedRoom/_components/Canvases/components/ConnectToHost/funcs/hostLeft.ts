import type { Guest } from '@/types'
import { useHostPeer, useSocketIO } from '@/zustand/store'

export const hostLeft = () =>
  useSocketIO.getState().io!.on('host-left', (host: Guest) => {
    useHostPeer.getState().peer?.destroy()
    useHostPeer.getState().set({ status: 'finding host' })
    useHostPeer.getState().reset()
  })
