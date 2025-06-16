import { useMyCoin } from '@/zustand/store/useMyCoin'

export const Coin = () => useMyCoin((state) => state.coin)
