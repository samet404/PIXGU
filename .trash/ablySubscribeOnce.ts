import type { OverrideProps } from '@/types/overrideProps'
import type { Message, RealtimeChannel } from 'ably'
/**
 * Subscribe to a channel and wait until receiving the first message then unsubscribe
 *
 * @param channel - The channel to subscribe to and unsubscribe from
 * @param event - The event to subscribe to and unsubscribe from
 * @param extras - Extras options object | Each option has summary
 * @returns A promise that resolves with the first message received
 */
export const ablySubscribeOnce = <
  /**Data type */
  DT,
>(
  channel: RealtimeChannel,
  event: string,
  extras?: {
    /** Maximum time to wait for a message in milliseconds. If the maximum time is reached, a `NO_RESPOND` error is thrown default*/
    maxLifetime?:
      | number
      | {
          value: number
          throwErr: boolean
        }
    /** A function to run after subscribing to the channel */
    doAfterSubscribe?: () => void
  },
): Promise<
  OverridenMessage<{
    data: DT
  }>
> =>
  new Promise((res) => {
    let maxLifetimeTimeout: ReturnType<typeof setTimeout>
    if (extras?.maxLifetime) {
      const ms =
        typeof extras.maxLifetime === 'number'
          ? extras.maxLifetime
          : extras.maxLifetime.value

      maxLifetimeTimeout = setTimeout(() => {
        channel.unsubscribe(event)

        if (
          typeof extras.maxLifetime === 'number' ||
          extras.maxLifetime?.throwErr
        )
          throw new Error('NO_RESPOND')
      }, ms)
    }

    channel
      .subscribe(event, (msg: Message) => {
        channel.unsubscribe(event)
        if (extras?.maxLifetime) clearTimeout(maxLifetimeTimeout)
        res(
          msg as OverridenMessage<{
            data: DT
          }>,
        )
      })
      .then(() => {
        if (extras?.doAfterSubscribe) extras.doAfterSubscribe()
      })
  })

type OverridenMessage<T> = OverrideProps<Message, T>
