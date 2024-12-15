import SimplePeer from 'simple-peer'
// import wrtc from 'wrtc'

export const iceServers: RTCIceServer[] = [
  {
    urls: [
      'stun:stun.l.google.com:19302',
      'stun:global.stun.twilio.com:3478',
      "stun:stun.relay.metered.ca:80"
    ]
  }
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
    // wrtc,
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
