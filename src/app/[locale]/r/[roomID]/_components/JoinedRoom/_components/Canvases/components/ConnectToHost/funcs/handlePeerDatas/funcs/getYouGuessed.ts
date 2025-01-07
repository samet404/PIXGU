import { useAmIGuessed, useGuessChatLayout, usePowerups, useRoomGuessChatMsgsStore, useRoomGeneralChatMsgsStore, useGeneralChatLayout } from '@/zustand/store'

export const getYouGuessed = () => {
  useAmIGuessed.getState().iGuessed()
  useRoomGeneralChatMsgsStore.getState().reset()
  useGeneralChatLayout.getState().setAvailable()
  useGuessChatLayout.getState().setNotAvailable()
  useRoomGuessChatMsgsStore.getState().reset()
  usePowerups.getState().setWinnersCards()
}
