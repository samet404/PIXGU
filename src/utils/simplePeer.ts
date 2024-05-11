import SimplePeer from 'simple-peer'

export const iceServers: RTCIceServer[] = [
  {
    urls: 'STUN:stun.cloudflare.com:3478',
    credential: '',
    username: '',
  },
  {
    urls: 'TURN:freestun.net:3479',
    credential: 'free',
    username: 'free',
  },
]

/**
 * Create a new SimplePeer instance with the given options.
 * @param opts - The options to use when creating the SimplePeer instance.
 */
export const simplePeer = (opts?: SimplePeer.Options): SimplePeer.Instance => {
  const iceServersData = opts?.config?.iceServers ?? iceServers
  if (!iceServersData || iceServersData.length === 0)
    throw new Error('No iceServers provided')

  return new SimplePeer({
    initiator: opts?.initiator ?? false,

    ...opts,
    config: {
      iceServers: iceServersData,

      ...opts?.config,
    },
  })
}
