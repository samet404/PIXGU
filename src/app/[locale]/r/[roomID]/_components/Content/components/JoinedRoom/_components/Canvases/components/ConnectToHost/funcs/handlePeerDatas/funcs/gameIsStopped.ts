import { useIsGameStopped } from '@/zustand/store'

export const gameIsStopped = () => {
  useIsGameStopped.getState().addCode('waitingForHost')
}
