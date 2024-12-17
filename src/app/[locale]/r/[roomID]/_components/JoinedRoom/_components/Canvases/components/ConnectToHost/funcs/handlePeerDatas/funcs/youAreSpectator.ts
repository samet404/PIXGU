import {
  useAmISpectator,
  useGuessChatLayout,
  useRoomGuessChatMsgsStore,
  useWinnersChatLayout,
} from '@/zustand/store'

export const youAreSpectator = () => {
  useAmISpectator.getState().iAmSpectator()
  useWinnersChatLayout.getState().setSpectatorLayout()
  useGuessChatLayout.getState().setSpectatorLayout()
  useRoomGuessChatMsgsStore.getState().reset()
}
