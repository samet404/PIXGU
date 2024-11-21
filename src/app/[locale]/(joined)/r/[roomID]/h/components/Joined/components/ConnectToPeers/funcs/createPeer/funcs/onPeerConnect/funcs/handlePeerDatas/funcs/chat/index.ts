import type { GuessChatFromClient, WinnersChatFromClient } from '@/types'
import { guessChat } from './funcs/guessChat'
import { winnersChat } from './funcs/winnersChat'
import { useHostPlayersMsgs } from '@/zustand/store'

export const chat = async (
  data: (GuessChatFromClient | WinnersChatFromClient)['data'],
  event: (GuessChatFromClient | WinnersChatFromClient)['event'],
  userID: string,
  roomID: string,
) => {
  if (data.msg.trim() === '') return
  const msgID = useHostPlayersMsgs.getState().addMsg(userID, data.msg)

  switch (event) {
    case 'winnersChat':
      winnersChat(data, userID, msgID)
      break
    case 'guessChat':
      guessChat(data, userID, msgID, roomID)
      break
  }


}
