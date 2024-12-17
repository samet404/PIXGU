import type { WinnersChatFromHost } from '@/types/webRTCConnData'
import { useRoomWinnersChatMsgsStore } from '@/zustand/store'

export const getWinnersChat = (data: WinnersChatFromHost['data']) =>
  useRoomWinnersChatMsgsStore.getState().add({
    myMsg: false,
    data,
  })
