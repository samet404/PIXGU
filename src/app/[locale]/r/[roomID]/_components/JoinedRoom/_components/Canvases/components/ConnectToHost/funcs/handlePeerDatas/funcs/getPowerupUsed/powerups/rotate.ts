import { usePlayersPowerups } from '@/zustand/store/usePlayersPowerups'
import { useWhoIsPainterClient } from '@/zustand/store/useWhoIsPainterClient'

export const rotate = (userID: string) => {
    console.log('rotate recevied')
    if (useWhoIsPainterClient.getState().value.amIPainter) return
    usePlayersPowerups.getState().setPowerupRunning(userID, 'rotate')
}