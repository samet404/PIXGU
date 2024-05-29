import type { Message } from 'ably'
import { ablyBasicClient } from '@/utils/ablyBasicClient'

export const waitServer = async ({ userID, roomID }: Args) => {
  console.log('Waiting for external server')

  const { ablyClient } = await ablyBasicClient({
    clientId: userID,
  })
  const firstEnterChannel = ablyClient.channels.get(
    `room:${roomID}:first-enter`,
  )
  const myFirstEnterChannel = ablyClient.channels.get(
    `room:${roomID}:first-enter:${userID}`,
  )

  firstEnterChannel.publish('WAITING_FOR_DB_RECORDS', undefined)

  try {
    await new Promise((res, rej) => {
      myFirstEnterChannel.subscribe(
        'WAITING_FOR_DB_RECORDS',
        (msg: Message) => {
          const status: Status = msg.data

          if (status === 'SUCCESS') {
            res(undefined)
          } else {
            myFirstEnterChannel.unsubscribe('WAITING_FOR_DB_RECORDS')
            rej(new Error('ALREADY_IN_ROOM'))
          }
        },
      )
    })
  } catch (e) {
    if (e instanceof Error) throw new Error(e.message)
  }

  console.log('External server is ready')
}

type Args = {
  userID: string
  roomID: string
}

type Status = 'SUCCESS' | 'ERROR'
