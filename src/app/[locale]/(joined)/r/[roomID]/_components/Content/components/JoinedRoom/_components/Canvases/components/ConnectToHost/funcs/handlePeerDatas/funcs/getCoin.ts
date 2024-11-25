import type { Coin } from '@/types/webRTCConnData'
import { useCoins } from '@/zustand/store'

export const getCoin = (data: Coin['data']) => {
  const { to, amount } = data

  useCoins.getState().set(to, amount)
}
