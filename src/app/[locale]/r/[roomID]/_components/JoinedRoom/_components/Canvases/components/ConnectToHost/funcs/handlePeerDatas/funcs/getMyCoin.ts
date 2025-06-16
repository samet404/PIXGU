import type { YourCoin } from '@/types/webRTCConnData'
import { useMyCoin } from '@/zustand/store/useMyCoin'

export const getMyCoin = (data: YourCoin['data']) =>
  useMyCoin.getState().set(data.amount)
