import type { YourGuessChatFromHost } from '@/types/webRTCConnData'
import { useRoomGuessChatMsgsStore } from '@/zustand/store'

export const getYourGuessChat = (data: YourGuessChatFromHost['data']) =>
  useRoomGuessChatMsgsStore.getState().add({
    myMsg: true,
    data,
  })
