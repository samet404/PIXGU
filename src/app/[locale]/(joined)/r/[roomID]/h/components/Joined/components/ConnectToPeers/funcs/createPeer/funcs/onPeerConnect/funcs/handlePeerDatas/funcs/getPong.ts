import type { Pong } from '@/types'
import { violetLog } from '@/utils'
import { usePlayersPing } from '@/zustand/store'

export const getPong = (data: Pong['data'], userID: string) => {
  const ping = Date.now() - data.date

  usePlayersPing.getState().set(ping, userID)
  violetLog(`PING ${ping}ms`)
}
