import type { GuessChatFromClient, WinnersChatFromClient } from '@/types'

export const chat = async (
  data: (GuessChatFromClient | WinnersChatFromClient)['data'],
  event: (GuessChatFromClient | WinnersChatFromClient)['event'],
  userID: string,
) => {
  if (data.msg.trim() === '') return

  if (event === 'guessChat')
    import('./funcs/guessChat').then((m) => m.guessChat(data, userID))

  const { sendToAllPeers, sendToPeerWithID } = await import('@/utils')
  const { createId } = await import('@paralleldrive/cuid2')

  sendToAllPeers(
    {
      from: 'host',
      event: event,
      data: {
        from: userID,
        msgID: `${createId()}-${userID}`,
        msg: data.msg,
      },
    },
    { except: [userID] },
  )

  sendToPeerWithID(userID, {
    from: 'host',
    event: `your${event.charAt(0).toUpperCase() + event.slice(1)}` as
      | 'yourGuessChat'
      | 'yourWinnersChat',
    data: {
      msgID: `${createId()}-${userID}`,
      msg: data.msg,
    },
  })
}
