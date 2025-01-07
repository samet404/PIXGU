import { usePlayersWhoGaveUp, useWhoIsPainterClient } from '@/zustand/store'

export const giveUp = (userID: string) => {
    if (useWhoIsPainterClient.getState().value.painterID === userID) return

    usePlayersWhoGaveUp.getState().add(userID)
}