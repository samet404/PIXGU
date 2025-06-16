import type { GeneralChatFromHost } from '@/types/webRTCConnData'
import { useRoomGeneralChatMsgsStore } from '@/zustand/store/useRoomGeneralChatMsgs'

export const getGeneralChat = (data: GeneralChatFromHost['data']) =>
  useRoomGeneralChatMsgsStore.getState().add({
    myMsg: false,
    data,
  })
