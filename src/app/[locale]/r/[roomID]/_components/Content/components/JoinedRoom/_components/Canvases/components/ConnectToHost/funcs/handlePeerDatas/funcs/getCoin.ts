import type { Coin } from '@/types/webRTCConnData'
import { usePlayers } from '@/zustand/store'

export const getCoin = async (data: Coin['data']) => {
  const { to, amount } = data

  usePlayers.getState().changePlayer(to, {
    coin: amount,
  })
}
