import SimplePeer from 'simple-peer'

export const iceServers: RTCIceServer[] = [

  {
    urls: "turn:159.69.14.23:3478",
    username: "test",
    credential: "test123",
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
