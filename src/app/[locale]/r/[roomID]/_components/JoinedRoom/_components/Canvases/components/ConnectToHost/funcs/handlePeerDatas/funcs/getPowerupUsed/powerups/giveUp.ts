import { usePlayersWhoGaveUp } from '@/zustand/store/usePlayersWhoGaveUp'
import { useWhoIsPainterClient } from '@/zustand/store/useWhoIsPainterClient'

export const giveUp = (userID: string) => {
    if (useWhoIsPainterClient.getState().value.painterID === userID) return

    usePlayersWhoGaveUp.getState().add(userID)
}