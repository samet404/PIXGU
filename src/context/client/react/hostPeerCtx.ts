import type { HostPeer } from '@/types/webRTCPeers'
import { createContext } from 'react'

export const HostPeerCtx = createContext<HostPeer>({})
