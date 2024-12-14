import SimplePeer from 'simple-peer'

export const iceServers: RTCIceServer[] = [

  {
    urls: "stun:stun.l.google.com:19302",
  },
  {
    urls: "turn:159.69.14.23:3478",
    username: "test",
    credential: "test123",
  },
  {
    urls: "turns:global.relay.metered.ca:443?transport=tcp",
    username: "e0bc174ce6b35fe4b4e3bab6",
    credential: "W9oGhBvOcEPA9vP7",
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
      ...opts?.channelConfig,
    },
    objectMode: true,
    config: {
      iceServers: iceServersData,
      ...opts?.config,
    },
    ...opts,
  })
}
