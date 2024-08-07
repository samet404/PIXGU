import type { WebRTCConnData } from '@/types'
import { useRoomGuessChatMsgsStore } from '@/zustand/store/useRoomGuessChatMsgs'
import { useRoomWinnersChatMsgsStore } from '@/zustand/store/useRoomWinnersChatMsgs'

export const getChats = (rtcData: WebRTCConnData) => {
  const { from, event, data } = rtcData
  if (from !== 'host') return null

  if (event === 'guessChat')
    useRoomGuessChatMsgsStore.setState({
      msgs: [...useRoomGuessChatMsgsStore.getState().msgs, { data }],
    })

  if (event === 'winnersChat')
    useRoomWinnersChatMsgsStore.setState({
      msgs: [...useRoomWinnersChatMsgsStore.getState().msgs, { data }],
    })
}
