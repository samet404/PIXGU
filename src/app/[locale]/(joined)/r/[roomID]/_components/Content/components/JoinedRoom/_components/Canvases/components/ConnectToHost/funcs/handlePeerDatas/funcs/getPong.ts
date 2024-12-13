import type { Pong } from '@/types/webRTCConnData'
import { violetLog } from '@/utils/violetLog'
import { usePing } from '@/zustand/store/usePing'

export const getPong = (data: Pong['data']) => {
  const latency = performance.now() - data.date

  violetLog(`PING ${latency}ms`)
  usePing.getState().set(latency)
}
