import SimplePeer from 'simple-peer'

export const iceServers: RTCIceServer[] = [
  {
    urls: 'stun:stun.relay.metered.ca:80',
  },
  {
    urls: 'turns:global.relay.metered.ca:443?transport=tcp',
    username: 'f63902bb2301c242c5811caf',
    credential: 'eKHSkufOyBjwfOKQ',
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
    channelConfig: {
      ordered: true,
    },
    objectMode: true,
    ...opts,
    config: {
      iceServers: iceServersData,

      ...opts?.config,
    },
  })
}
