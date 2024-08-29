import type { WebRTCConnData } from '@/types/webRTCConnData'
import { violetLog } from '@/utils/violetLog'
import { usePing } from '@/zustand/store/usePing'

export const getPong = (rtcData: WebRTCConnData) => {
  const { event, from } = rtcData

  if (event === 'pong' && from === 'host') {
    const { data } = rtcData
    const latency = Date.now() - data.date

    violetLog(`PING ${latency}ms`)
    usePing.getState().set(latency)
  }
}
