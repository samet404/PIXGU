import type { GuessChatFromClient, Locale, GeneralChatFromClient } from '@/types'
import { guessChat, generalChat } from './funcs'
import { useHostPlayersMsgs } from '@/zustand/store/useHostPlayersMsgs'

export const chat = (
  data: (GuessChatFromClient | GeneralChatFromClient)['data'],
  event: (GuessChatFromClient | GeneralChatFromClient)['event'],
  userID: string,
  locale: Locale,
) => {
  if (data.msg.trim() === '') return
  const msgID = useHostPlayersMsgs.getState().addMsg(userID, data.msg)

  switch (event) {
    case 'generalChat':
      generalChat(data, userID, msgID)
      break
    case 'guessChat':
      guessChat(data, userID, msgID, locale)
      break
  }
}
