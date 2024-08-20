import type { WebRTCConnData } from '@/types'
import { sendToAllPeers } from '@/utils/sendToAllPeers'
import { sendToPeerWithID } from '@/utils/sendToPeerWithID'
import { createId } from '@paralleldrive/cuid2'

export const chat = (sentData: WebRTCConnData, userID: string) => {
  const { data, event, from } = sentData

  if (
    event === 'guessChat' ||
    event === 'winnersChat' ||
    event === 'darkZoneChat'
  ) {
    if (from !== 'client') return
    if (data.msg === '') return

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
        | 'yourWinnersChat'
        | 'yourDarkZoneChat',
      data: {
        msgID: `${createId()}-${userID}`,
        msg: data.msg,
      },
    })
  }
}
