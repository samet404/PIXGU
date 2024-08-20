import type { WebRTCConnData } from '@/types/webRTCConnData'
import { violetLog } from '@/utils/violetLog'
import { usePing } from '@/zustand/store/usePing'

export const getPong = (rtcData: WebRTCConnData) => {
  const { event, from, data } = rtcData

  if (event === 'pong' && from === 'host') {
    const latency = Date.now() - data.date

    violetLog(`PING ${latency}ms`)
    usePing.getState().set(latency)
  }
}
