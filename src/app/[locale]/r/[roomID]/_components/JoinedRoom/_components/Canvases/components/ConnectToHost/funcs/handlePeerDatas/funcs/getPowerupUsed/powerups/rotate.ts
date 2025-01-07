import { usePlayersPowerups, useWhoIsPainterClient } from '@/zustand/store'

export const rotate = (userID: string) => {
    console.log('rotate recevied')
    if (useWhoIsPainterClient.getState().value.amIPainter) return
    usePlayersPowerups.getState().setPowerupRunning(userID, 'rotate')
}