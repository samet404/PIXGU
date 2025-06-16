import PixguPeer from 'simple-peer'

export const iceServers: RTCIceServer[] = [
  {
    urls: [
      'stun:stun.l.google.com:19302',
      'stun:global.stun.twilio.com:3478',
      'stun:stun.relay.metered.ca:80',
    ],
  },
]

/**
 * Create a new PixguPeer instance
 * @param opts - The options to use when creating the PixguPeer instance.
 */
export const PixguPeer = (opts?: PixguPeer.Options): PixguPeer.Instance => {
  const iceServersData = opts?.config?.iceServers ?? iceServers
  if (!iceServersData || iceServersData.length === 0)
    throw new Error('No iceServers provided')

  return new PixguPeer({
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
