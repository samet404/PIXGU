import PixguPeer from './source/pixguPeer'

/**
 * Create a new SimplePeer instance
 * @param opts - The options to use when creating the SimplePeer instance.
 */
export const pixguPeer = (opts?: PixguPeer.Options): PixguPeer.Instance => {
  return new PixguPeer({
    initiator: opts?.initiator ?? false,
    channelConfig: {
      ordered: true,
      ...opts?.channelConfig,
    },
    objectMode: true,
    config: {
      ...opts?.config,
    },
    ...opts,
  })
}
