import type { LosedAsGuesser } from '@/types'
import { useLoserPlayers } from '@/zustand/store/useLoserPlayers'

export const getLosedAsGuessr = ({ userID }: LosedAsGuesser['data']) => {
    useLoserPlayers.getState().add(userID)
}