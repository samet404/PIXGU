import { useAmIGuessed } from '@/zustand/store/useAmIGuessed'
import { useGuessChatLayout } from '@/zustand/store/useGuessChatLayout'
import { useGeneralChatLayout } from '@/zustand/store/useGeneralChatLayout'
import { usePowerups } from '@/zustand/store/usePowerups'
import { useRoomGuessChatMsgsStore } from '@/zustand/store/useRoomGuessChatMsgs'
import { useRoomGeneralChatMsgsStore } from '@/zustand/store/useRoomGeneralChatMsgs'

export const getYouGuessed = () => {
  useAmIGuessed.getState().iGuessed()
  useRoomGeneralChatMsgsStore.getState().reset()
  useGeneralChatLayout.getState().setAvailable()
  useGuessChatLayout.getState().setNotAvailable()
  useRoomGuessChatMsgsStore.getState().reset()
  usePowerups.getState().setWinnersCards()
}
