import type { WebRTCConnData } from '@/types'
import { useDarkZoneChatMsgsStore } from '@/zustand/store/useDarkZoneChatMsgs'
import { useRoomGuessChatMsgsStore } from '@/zustand/store/useRoomGuessChatMsgs'
import { useRoomWinnersChatMsgsStore } from '@/zustand/store/useRoomWinnersChatMsgs'

export const getChats = (rtcData: WebRTCConnData, myUserID: string) => {
  const { from, event, data } = rtcData
  if (from !== 'host') return

  if (event === 'guessChat')
    useRoomGuessChatMsgsStore.getState().add({
      myMsg: false,
      data: {
        ...data,
      },
    })
  else if (event === 'winnersChat')
    useRoomWinnersChatMsgsStore.getState().add({
      myMsg: false,
      data: {
        ...data,
      },
    })
  else if (event === 'darkZoneChat')
    useDarkZoneChatMsgsStore.getState().add({
      myMsg: false,
      data: {
        ...data,
      },
    })
  else if (event === 'yourDarkZoneChat')
    useDarkZoneChatMsgsStore.getState().add({
      myMsg: true,
      data: {
        ...data,
      },
    })
  else if (event === 'yourWinnersChat') {
    useRoomWinnersChatMsgsStore.getState().add({
      myMsg: true,
      data: {
        ...data,
      },
    })
  } else if (event === 'yourGuessChat') {
    useRoomGuessChatMsgsStore.getState().add({
      myMsg: true,
      data: {
        ...data,
      },
    })
  }
}
