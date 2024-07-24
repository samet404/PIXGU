import SimplePeer from 'simple-peer'

export const iceServers: RTCIceServer[] = [
  {
    urls: 'stun:stun.relay.metered.ca:80',
  },
  {
    urls: 'turn:global.relay.metered.ca:80?transport=tcp',
    username: 'deb044f685ce32c4b6566f9c',
    credential: 'gDy3Pgf3ErAAju6v',
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
