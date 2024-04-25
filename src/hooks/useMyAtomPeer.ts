import { iceServers } from '@/utils/iceServers'
import Peer, { type PeerOptions as DefaultPeerOptions } from 'peerjs'
import { useRef } from 'react'
import { useEffectOnce } from '@/hooks/useEffectOnce'
import { type PrimitiveAtom, useAtom } from 'jotai'

/**
 * Custom hook to set Jotai Atom value to myPeer when avaible
 */
export const useMyAtomPeer = (
  myPeerAtom: PrimitiveAtom<Peer | null>,
  options?: PeerOptions | undefined | null,
  // eslint-disable-next-line no-unused-vars
  afterInit?: ((peer: Peer) => void | Promise<void>) | undefined | null,
  id?: string | undefined | null,
): UseMyAtomPeerReturnType => {
  const [myPeer, setMyPeer] = useAtom(myPeerAtom)
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

type UseMyAtomPeerReturnType = {
  myPeer: Peer | null
}

// we need to omit the key property from the default options because key is deprecated
type PeerOptions = Omit<DefaultPeerOptions, 'key'>
