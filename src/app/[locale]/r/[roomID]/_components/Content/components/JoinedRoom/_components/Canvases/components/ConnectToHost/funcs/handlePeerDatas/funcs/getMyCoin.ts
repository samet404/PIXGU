import type { YourCoin } from '@/types/webRTCConnData'
import { useMyCoin } from '@/zustand/store'

export const getMyCoin = (data: YourCoin['data']) =>
  useMyCoin.getState().add(data.amount)
