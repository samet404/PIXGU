'use client'

import { Msg } from './Msg'
import { MyMsg } from './MyMsg'
import { useDarkZoneChatMsgsStore } from '@/zustand/store/useDarkZoneChatMsgs'

export const Messages = () => {
  const messages = useDarkZoneChatMsgsStore((state) => state.msgs)

  return messages
    .slice()
    .reverse()
    .map((rtcData) => {
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
