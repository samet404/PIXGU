import { useCoins } from '@/zustand/store'

export const Coin = ({ ID }: Props) => {
  const coin = useCoins((s) => s.get(ID))
  return coin
}

type Props = {
  ID: string
}
