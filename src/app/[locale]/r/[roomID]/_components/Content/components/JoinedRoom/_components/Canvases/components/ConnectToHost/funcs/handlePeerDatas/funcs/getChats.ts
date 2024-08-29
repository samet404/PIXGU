import type { WebRTCConnData } from '@/types'
import { useDarkZoneChatMsgsStore } from '@/zustand/store/useDarkZoneChatMsgs'
import { useRoomGuessChatMsgsStore } from '@/zustand/store/useRoomGuessChatMsgs'
import { useRoomWinnersChatMsgsStore } from '@/zustand/store/useRoomWinnersChatMsgs'

export const getChats = (rtcData: WebRTCConnData, myUserID: string) => {
  const { from, event } = rtcData
  if (from !== 'host') return
  if (
    event !== 'guessChat' &&
    event !== 'winnersChat' &&
    event !== 'darkZoneChat' &&
    event !== 'yourDarkZoneChat' &&
    event !== 'yourWinnersChat' &&
    event !== 'yourGuessChat'
  )
    return

  console.log('dsadsa')
  switch (event) {
    case 'guessChat':
      useRoomGuessChatMsgsStore.getState().add({
        myMsg: false,
        data: {
          ...rtcData.data,
        },
      })
      break
    case 'winnersChat':
      useRoomWinnersChatMsgsStore.getState().add({
        myMsg: false,
        data: {
          ...rtcData.data,
        },
      })
      break
    case 'darkZoneChat':
      useDarkZoneChatMsgsStore.getState().add({
        myMsg: false,
        data: {
          ...rtcData.data,
        },
      })
      break
    case 'yourDarkZoneChat':
      useDarkZoneChatMsgsStore.getState().add({
        myMsg: true,
        data: {
          ...rtcData.data,
        },
      })
      break
    case 'yourWinnersChat':
      useRoomWinnersChatMsgsStore.getState().add({
        myMsg: true,
        data: {
          ...rtcData.data,
        },
      })
      break
    case 'yourGuessChat':
      useRoomGuessChatMsgsStore.getState().add({
        myMsg: true,
        data: {
          ...rtcData.data,
        },
      })
      break
  }
}
