import SimplePeer from 'simple-peer'

export const iceServers: RTCIceServer[] = [
  {
    urls: "stun:stun.relay.metered.ca:80",
  },
]


/**
 * Create a new SimplePeer instance
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
