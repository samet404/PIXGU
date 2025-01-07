import { useGuessedPlayers, useLoserPlayers, usePlayers, usePlayersWhoGaveUp } from '@/zustand/store';

export const isMatchEnd = () => {
    const guessedPlayersCount = useGuessedPlayers.getState().playersIDs.length
    const gaveUpPlayersCount = usePlayersWhoGaveUp.getState().users.length
    const loserPlayersCount = useLoserPlayers.getState().users.length

    return usePlayers.getState().value.count - 1 === (guessedPlayersCount + loserPlayersCount + gaveUpPlayersCount)
}