'use client'

import { useRoomGeneralChatMsgsStore } from '@/zustand/store/useRoomGeneralChatMsgs'
import { Msg } from '../../Msg'
import { MyMsg } from '../../MyMsg'

export const Messages = () => {
  const messages = useRoomGeneralChatMsgsStore((state) => state.msgs)

  return messages.map((rtcData) => {
    const { myMsg } = rtcData

    if (!myMsg) {
      const { from, msg, msgID } = rtcData.data

      return <Msg key={msgID} ID={from} msg={msg} />
    } else if (myMsg) {
      const { msg, msgID } = rtcData.data

      return <MyMsg key={msgID} msg={msg} />
    }
  })
}
