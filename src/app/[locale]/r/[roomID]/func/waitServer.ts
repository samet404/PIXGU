import type { Message } from 'ably'
import { ablyBasicClient } from '@/utils/ablyBasicClient'

export const waitServer = async ({ userID, roomID }: Args) => {
  const { ablyClient } = await ablyBasicClient({
    clientId: userID,
  })
  const firstEnterChannel = ablyClient.channels.get(
    `room:${roomID}:first-enter`,
  )
  const myFirstEnterChannel = ablyClient.channels.get(
    `room:${roomID}:first-enter:${userID}`,
  )

  await new Promise<void>((res) => {
    myFirstEnterChannel.subscribe('WAITING_FOR_DB_RECORDS', (msg: Message) => {
      const status: Status = msg.data

      if (status === 'SUCCESS') {
        res()
      } else {
        throw new Error('ALREADY_IN_ROOM')
      }
    })
  })

  firstEnterChannel.publish('WAITING_FOR_DB_RECORDS', undefined)
}

type Args = {
  userID: string
  roomID: string
}

type Status = 'SUCCESS' | 'ERROR'
