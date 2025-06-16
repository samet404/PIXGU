import { useAmIPainting } from '@/zustand/store/useAmIPainting'
import { useAmISpectator } from '@/zustand/store/useAmISpectator'
import { useCoins } from '@/zustand/store/useCoins'
import { useGuessChatLayout } from '@/zustand/store/useGuessChatLayout'
import { useGuessedPlayers } from '@/zustand/store/useGuessedPlayers'
import { useIsGameStopped } from '@/zustand/store/useIsGameStopped'
import { useMatchStatusClient } from '@/zustand/store/useMatchStatusClient'
import { useMyCoin } from '@/zustand/store/useMyCoin'
import { useNewPainterPanel } from '@/zustand/store/useNewPainterPanel'
import { useRoomGuessChatMsgsStore } from '@/zustand/store/useRoomGuessChatMsgs'
import { useRoomGeneralChatMsgsStore } from '@/zustand/store/useRoomGeneralChatMsgs'
import { useSelectThemePanel } from '@/zustand/store/useSelectThemePanel'
import { useSpectators } from '@/zustand/store/useSpectators'
import { useWhoIsPainterClient } from '@/zustand/store/useWhoIsPainterClient'
import { useGeneralChatLayout } from '@/zustand/store/useGeneralChatLayout'

export const gameIsStopped = () => {
  useIsGameStopped.getState().addCode('waitingForHost')
  useWhoIsPainterClient.getState().reset()
  useAmIPainting.getState().reset()
  useGeneralChatLayout.getState().reset()
  useGuessChatLayout.getState().reset()
  useRoomGeneralChatMsgsStore.getState().reset()
  useRoomGuessChatMsgsStore.getState().reset()
  useGuessedPlayers.getState().reset()
  useMyCoin.getState().reset()
  useCoins.getState().reset()
  useSpectators.getState().reset()
  useAmISpectator.getState().reset()
  useNewPainterPanel.getState().reset()
  useMatchStatusClient.getState().reset()
  useSelectThemePanel.getState().reset()
}
