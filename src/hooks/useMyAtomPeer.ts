import Peer, { type PeerOptions as DefaultPeerOptions } from 'peerjs'
import { iceServers } from '@/utils/iceServers'
import { useEffect, useRef, useState } from 'react'
import { useEffectOnce } from '@/hooks/useEffectOnce'
import { type PrimitiveAtom, useSetAtom } from 'jotai'

/**
 * Custom hook to set Jotai Atom value to myPeer when avaible
 */
export const useMyAtomPeer = (
  myPeerAtom: PrimitiveAtom<Peer | null>,
  options?: PeerOptions | undefined | null,
  // eslint-disable-next-line no-unused-vars
  afterInit?: ((peer: Peer) => void | Promise<void>) | undefined | null,
  id?: string | undefined | null,
) => {
  const [isSuccess, setIsSuccess] = useState<boolean>(false)
  const [isErr, setIsErr] = useState<boolean>(false)
  const err = useRef<string | null>(null)
  const myPeer = useRef<Peer | null>(null)

  const setMyPeer = useSetAtom(myPeerAtom)
  const afterInıtCalled = useRef<boolean>(false)

  const newOptions: PeerOptions = {
    debug: options?.debug ?? process.env.NODE_ENV == 'production' ? 0 : 2,

    ...options,
    config: {
      ...options?.config,
      iceServers: options?.config?.iceServers ?? iceServers ?? [],
    },
  }

  useEffectOnce(() => {
    const peer = new Peer(id ?? '', newOptions)

    peer.once('error', (e) => {
      err.current = e.message
      setIsErr(true)
    })

    peer.once('open', () => {
      myPeer.current = peer
      setMyPeer(peer)
      setIsSuccess(true)
    })
  })

  useEffect(() => {
    if (isSuccess && myPeer.current && afterInit && !afterInıtCalled.current) {
      afterInit(myPeer.current)
      afterInıtCalled.current = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess])

  return {
    isErr,
    err: err.current,
    isSuccess,
    myPeer,
  }
}

// we need to omit the key property from the default options because key is deprecated
type PeerOptions = Omit<DefaultPeerOptions, 'key'>
