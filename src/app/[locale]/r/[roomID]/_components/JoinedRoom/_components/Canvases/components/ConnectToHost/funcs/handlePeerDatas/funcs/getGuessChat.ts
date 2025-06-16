import type { GuessChatFromHost } from '@/types/webRTCConnData'
import { useRoomGuessChatMsgsStore } from '@/zustand/store/useRoomGuessChatMsgs'

export const getGuessChat = (data: GuessChatFromHost['data']) =>
  useRoomGuessChatMsgsStore.getState().add({
    myMsg: false,
    data,
  })
