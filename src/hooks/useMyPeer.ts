import { iceServers } from '@/utils/iceServers'
import Peer, { type PeerOptions as DefaultPeerOptions } from 'peerjs'
import { useRef, useState } from 'react'
import { useEffectOnce } from '@/hooks/useEffectOnce'

/**
 * Custom hook to create a myPeer state
 */
export const useMyPeer = (
  options?: PeerOptions | undefined | null,
  afterInit?: ((peer: Peer) => void | Promise<void>) | undefined | null,
  id?: string | undefined | null,
): UseMyPeerReturnType => {
  const [myPeer, setMyPeer] = useState<Peer | null>(null)
  const afterInıtCalled = useRef<boolean>(false)

  const newOptions: PeerOptions = {
    debug: options?.debug ?? process.env.NODE_ENV == 'production' ? 0 : 2,

    ...options,
    config: {
      ...options?.config,
      iceServers: options?.config?.iceServers ?? iceServers ?? [],
    },
  }

  useEffectOnce(() => setMyPeer(new Peer(id ?? '', newOptions)))

  if (myPeer && afterInit && !afterInıtCalled.current) {
    afterInit(myPeer)
    afterInıtCalled.current = true
  }

  return { myPeer }
}

type UseMyPeerReturnType = {
  myPeer: Peer | null
}

// we need to omit the key property from the default options because key is deprecated
type PeerOptions = Omit<DefaultPeerOptions, 'key'>
