import {
  AblyClientContext,
  NextPainterContext,
  CurrentPainterContext,
  PaintersOrderCtx,
  RoomIDContext,
} from '@/context/client'
import { subscribeAblyPresence } from '@/utils/subscribeAblyPresence'
import { useContext } from 'react'

/**
 * Handles everything related to painters.
 */
export const usePainters = () => {
  // #region global values
  const ablyClient = useContext(AblyClientContext)!
  const roomID = useContext(RoomIDContext)
  const currentPainter = useContext(CurrentPainterContext)
  const nextPainter = useContext(NextPainterContext)
  const paintersOrder = useContext(PaintersOrderCtx)
  let currentPainterIndex = 0

  // #region ably channels
  const roomChannel = ablyClient.channels.get(`room:${roomID}`)
  const roomServerPainterChannel = ablyClient.channels.get(
    `server:room:${roomID}:painter`,
  )
  // #endregion

  // #region
  roomServerPainterChannel.subscribe('update', (msg) => {
    const painter: number = msg.data

    currentPainter.value = paintersOrder.value[currentPainterIndex]
    nextPainter.value = paintersOrder.value[]
  })

  // #endregion

  // #region Ably listeners
  subscribeAblyPresence(roomChannel, 'enter', async () => {
    const presenceSet = await roomChannel.presence.get()

    const newPaintersOrder = presenceSet
      .sort((a, b) => a.timestamp - b.timestamp)
      .map((p) => p.clientId)

    paintersOrder.value = newPaintersOrder
  })

  subscribeAblyPresence(roomChannel, 'leave', async (msg) => {
    const presenceSet = await roomChannel.presence.get()

    const newPaintersOrder = presenceSet
      .sort((a, b) => a.timestamp - b.timestamp)
      .map((p) => p.clientId)

    paintersOrder.value = newPaintersOrder
  })
  // #endregion
}
