import { Msg } from '../../Msg'
import { MyMsg } from '../../MyMsg'
import { useRoomGuessChatMsgsStore } from '@/zustand/store'

export const Messages = () => {
  const messages = useRoomGuessChatMsgsStore((state) => state.msgs)

  console.log(messages)
  return messages.map((rtcData) => {
    const { myMsg } = rtcData

    if (!myMsg) {
      const { from, msg, msgID, similarity } = rtcData.data

      return <Msg key={msgID} ID={from} similarity={similarity} msg={msg} />
    } else if (myMsg) {
      const { msg, msgID, similarity } = rtcData.data

      return <MyMsg key={msgID} similarity={similarity} msg={msg} />
    }
  })
}
