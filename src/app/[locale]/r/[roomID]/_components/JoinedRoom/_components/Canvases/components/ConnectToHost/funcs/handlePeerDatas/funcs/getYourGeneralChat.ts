import type { YourGeneralChatFromHost } from '@/types/webRTCConnData'
import { useRoomGeneralChatMsgsStore } from '@/zustand/store'

export const getYourGeneralChat = (data: YourGeneralChatFromHost['data']) =>
  useRoomGeneralChatMsgsStore.getState().add({
    myMsg: true,
    data,
  })
