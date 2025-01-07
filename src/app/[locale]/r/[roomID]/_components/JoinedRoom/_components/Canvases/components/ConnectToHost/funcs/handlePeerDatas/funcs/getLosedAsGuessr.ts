import type { LosedAsGuesser } from '@/types'
import { useLoserPlayers } from '@/zustand/store'

export const getLosedAsGuessr = ({ userID }: LosedAsGuesser['data']) => {
    useLoserPlayers.getState().add(userID)
}