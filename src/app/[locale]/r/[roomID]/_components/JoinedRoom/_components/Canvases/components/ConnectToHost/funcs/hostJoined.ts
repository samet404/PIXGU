import { useAmIPainting, useAmISpectator, useCoins, useGuessChatLayout, useGuessedPlayers, useHostPeer, useIsGameStopped, useMatchStatusClient, useMyCoin, useNewPainterPanel, usePing, useRoomGuessChatMsgsStore, useRoomGeneralChatMsgsStore, useSelectThemePanel, useSpectators, useWhoIsPainterClient, useGeneralChatLayout } from '@/zustand/store'
import { positiveLog } from '@/utils'
import { createHostPeer } from './createHostPeer'

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
