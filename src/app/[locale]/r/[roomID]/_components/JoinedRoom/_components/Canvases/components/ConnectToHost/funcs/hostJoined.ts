import { useAmIPainting } from '@/zustand/store/useAmIPainting'
import { useAmISpectator } from '@/zustand/store/useAmISpectator'
import { useCoins } from '@/zustand/store/useCoins'
import { useGuessChatLayout } from '@/zustand/store/useGuessChatLayout'
import { useGuessedPlayers } from '@/zustand/store/useGuessedPlayers'
import { useHostPeer } from '@/zustand/store/useHostPeer'
import { useIsGameStopped } from '@/zustand/store/useIsGameStopped'
import { useMatchStatusClient } from '@/zustand/store/useMatchStatusClient'
import { useMyCoin } from '@/zustand/store/useMyCoin'
import { useNewPainterPanel } from '@/zustand/store/useNewPainterPanel'
import { usePing } from '@/zustand/store/usePing'
import { useRoomGuessChatMsgsStore } from '@/zustand/store/useRoomGuessChatMsgs'
import { useRoomGeneralChatMsgsStore } from '@/zustand/store/useRoomGeneralChatMsgs'
import { useSelectThemePanel } from '@/zustand/store/useSelectThemePanel'
import { positiveLog } from '@/utils'
import { createHostPeer } from './createHostPeer'
import { useWhoIsPainterClient } from '@/zustand/store/useWhoIsPainterClient'
import { useGeneralChatLayout } from '@/zustand/store/useGeneralChatLayout'
import { useSpectators } from '@/zustand/store/useSpectators'

/**
 * This function handles the event when the host joins the room.
 */
export const hostJoined = (roomID: string, myUserID: string) => {
  positiveLog('HOST JOINED')
  createHostPeer(roomID, myUserID)

  useHostPeer.getState().set({ status: 'connecting' })
  useIsGameStopped.getState().addCode('connectingToHost')
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

  usePing.getState().reset()
}
