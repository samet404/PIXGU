import { useGuessedPlayers } from '@/zustand/store/useGuessedPlayers';
import { useLoserPlayers } from '@/zustand/store/useLoserPlayers';
import { usePlayers } from '@/zustand/store/usePlayers';
import { usePlayersWhoGaveUp } from '@/zustand/store/usePlayersWhoGaveUp';

export const isMatchEnd = () => {
    const guessedPlayersCount = useGuessedPlayers.getState().playersIDs.length
    const gaveUpPlayersCount = usePlayersWhoGaveUp.getState().users.length
    const loserPlayersCount = useLoserPlayers.getState().users.length

    return usePlayers.getState().value.count - 1 === (guessedPlayersCount + loserPlayersCount + gaveUpPlayersCount)
}