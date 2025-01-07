import { useCoins } from '@/zustand/store'

export const Coin = ({ ID }: Props) => {
  const coin = useCoins((s) => s.coins[ID])

  return <div className="flex w-14 items-center justify-center leading-3 drop-shadow-[0_0px_2px_rgba(0,0,0,0.3)]">
    {coin ? coin : 50}
  </div>
}

type Props = {
  ID: string
}
