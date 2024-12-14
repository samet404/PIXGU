import type { Ping } from '@/types'
import { sendToHostPeer, violetLog } from '@/utils'
import { usePing } from '@/zustand/store'

export const getPing = (data: Ping['data']) => {
  usePing.getState().set(data.ping)
  sendToHostPeer({ event: 'pong', data })
  violetLog(`PING ${data.ping}ms`)
}
