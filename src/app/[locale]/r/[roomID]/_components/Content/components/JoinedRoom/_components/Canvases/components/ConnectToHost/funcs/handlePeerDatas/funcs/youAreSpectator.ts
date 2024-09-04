import {
  useAmISpectator,
  useGuessChatLayout,
  useIsGameStopped,
  useWinnersChatLayout,
} from '@/zustand/store'

export const youAreSpectator = () => {
  useAmISpectator.getState().iAmSpectator()
  useIsGameStopped.getState().open()
  useWinnersChatLayout.getState().setSpectatorLayout()
  useGuessChatLayout.getState().setSpectatorLayout()
}
