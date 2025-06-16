import type { YourGuessChatFromHost } from '@/types/webRTCConnData'
import { useRoomGuessChatMsgsStore } from '@/zustand/store/useRoomGuessChatMsgs'

export const getYourGuessChat = (data: YourGuessChatFromHost['data']) =>
  useRoomGuessChatMsgsStore.getState().add({
    myMsg: true,
    data,
  })
