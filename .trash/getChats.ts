import type {
  GuessChatFromHost,
  WebRTCConnData,
  WinnersChatFromClient,
  WinnersChatFromHost,
  YourGuessChatFromHost,
} from '@/types'
import { useRoomGuessChatMsgsStore } from '@/zustand/store/useRoomGuessChatMsgs'
import { useRoomWinnersChatMsgsStore } from '@/zustand/store/useRoomWinnersChatMsgs'

export const getChats = (
  data: (
    | GuessChatFromHost
    | YourGuessChatFromHost
    | WinnersChatFromClient
    | WinnersChatFromHost
  )['data'],
  event: (
    | GuessChatFromHost
    | YourGuessChatFromHost
    | WinnersChatFromClient
    | WinnersChatFromHost
  )['event'],
  myUserID: string,
) => {
  switch (event) {
    case 'guessChat':
      break
    case 'winnersChat':
      useRoomWinnersChatMsgsStore.getState().add({
        myMsg: false,
        data: {
          ...data,
        },
      })
      break
    case 'yourWinnersChat':
      break
    case 'yourGuessChat':
      break
  }
}
