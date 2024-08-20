import { sendToHostPeer } from './sendToHostPeer'

/**
 * This function uses the ping like mechanism to measure the latency between peers
 * @link https://en.wikipedia.org/wiki/Ping_(networking_utility)
 */
export const pingHostPeer = (heartbeatIntervalMs: number) => {
  setInterval(
    () =>
      sendToHostPeer({
        from: 'client',
        event: 'ping',
        data: {
          date: Date.now(),
          something:
            'Ad eiusmod qui in aliqua irure. Ipsum eu elit enim mollit adipisicing incididunt.',
        },
      }),
    heartbeatIntervalMs,
  )
}
