import { useAmIGuessed, useGuessChatLayout, useRoomGuessChatMsgsStore, useRoomWinnersChatMsgsStore, useWinnersChatLayout } from '@/zustand/store'

export const getYouGuessed = () => {
  useAmIGuessed.getState().iGuessed()
  useRoomWinnersChatMsgsStore.getState().reset()
  useWinnersChatLayout.getState().setIGuessed()
  useGuessChatLayout.getState().setIGuessed()
  useRoomGuessChatMsgsStore.getState().reset()
}
