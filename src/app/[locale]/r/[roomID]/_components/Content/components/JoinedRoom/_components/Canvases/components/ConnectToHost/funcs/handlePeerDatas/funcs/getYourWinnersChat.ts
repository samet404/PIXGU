import type { YourWinnersChatFromHost } from '@/types/webRTCConnData'
import { useRoomWinnersChatMsgsStore } from '@/zustand/store'

export const getYourWinnersChat = (data: YourWinnersChatFromHost['data']) =>
  useRoomWinnersChatMsgsStore.getState().add({
    myMsg: true,
    data,
  })
