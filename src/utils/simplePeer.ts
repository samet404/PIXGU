import SimplePeer from 'simple-peer'

export const iceServers: RTCIceServer[] = [
  {
    urls: "stun:stun.relay.metered.ca:80",
  },
  {
    urls: "turn:global.relay.metered.ca:80",
    username: "e0bc174ce6b35fe4b4e3bab6",
    credential: "W9oGhBvOcEPA9vP7",
  },
  {
    urls: "turn:global.relay.metered.ca:80?transport=tcp",
    username: "e0bc174ce6b35fe4b4e3bab6",
    credential: "W9oGhBvOcEPA9vP7",
  },
  {
    urls: "turn:global.relay.metered.ca:443",
    username: "e0bc174ce6b35fe4b4e3bab6",
    credential: "W9oGhBvOcEPA9vP7",
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
    ...opts,
    config: {
      iceServers: iceServersData,

      ...opts?.config,
    },
  })
}
