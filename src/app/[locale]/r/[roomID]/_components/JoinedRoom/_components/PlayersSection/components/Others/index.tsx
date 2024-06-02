'use client'

import dynamic from 'next/dynamic'
import { useRoomPlayersIDsStore } from '@/zustand/store/useRoomPlayersIDsStore'

const Other = dynamic(() => import('./components/Other'))

const Others = ({ roomID, userID }: Props) => {
  const playersIDs = useRoomPlayersIDsStore((s) => s.IDs)
  console.log(playersIDs.filter((ID) => ID !== userID).map((p) => p))

  return playersIDs.map((ID) => <Other key={ID} ID={ID} />)
}

export default Others

type Props = {
  userID: string
  roomID: string
}
