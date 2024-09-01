import type { WebRTCSignalData } from '@/types/webRTCSignalData'
import type SimplePeer from 'simple-peer'
import { api } from '@/trpc/client'
import { goldLog } from '@/utils/goldLog'

export const onPeerSignal = (
  peer: SimplePeer.Instance,
  userID: string,
  roomID: string,
) =>
  peer.on('signal', async (data: WebRTCSignalData) => {
    goldLog(`${data.type.toUpperCase()} SENT TO ${userID}`, data)

    console.log('sending signal data to player ' + userID)
    await api.gameRoom.sendSignalDataToPlayer.mutate({
      roomID,
      playerID: userID,
      signalData: data,
    })
  })
