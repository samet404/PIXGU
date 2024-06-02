import type { RealtimeChannel } from 'ably'
import { ablySubscribeOnce } from '@/utils/ablySubscribeOnce'
import { mToMs } from '@/utils/mToMs'

export const waitServer = async (
  userID: string,
  roomID: string,
  myFirstEnterChannel: RealtimeChannel,
  firstEnterChannel: RealtimeChannel,
) => {
  // #region waiting for external server adds db records and answers back with status
  await (async () => {
    console.log('Waiting for external server for db records...')
    const { data } = await ablySubscribeOnce<'SUCCESS' | 'ERROR'>(
      myFirstEnterChannel,
      'WAITING_FOR_DB_RECORDS',
      {
        maxLifetime: mToMs(5),
        doAfterSubscribe: async () => {
          await firstEnterChannel.publish('WAITING_FOR_DB_RECORDS', undefined)
        },
      },
    )

    if (data === 'SUCCESS')
      console.log('External server added db records successfully')
    else if (data === 'ERROR') throw new Error('ALREADY_IN_ROOM')
    else throw new Error('UNEXPECTED_ANSWER_FROM_SERVER')
  })()
  // #endregion
}
