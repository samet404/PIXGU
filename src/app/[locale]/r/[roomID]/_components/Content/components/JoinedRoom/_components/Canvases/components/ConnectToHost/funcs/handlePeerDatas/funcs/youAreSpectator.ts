import {
  useAmISpectator,
  useGuessChatLayout,
  useWinnersChatLayout,
} from '@/zustand/store'

export const youAreSpectator = () => {
  useAmISpectator.getState().iAmSpectator()
  useWinnersChatLayout.getState().setSpectatorLayout()
  useGuessChatLayout.getState().setSpectatorLayout()
}
