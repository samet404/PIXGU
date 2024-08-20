import { useMyCoin } from '@/zustand/store'

export const Coin = () => useMyCoin((state) => state.coin)
