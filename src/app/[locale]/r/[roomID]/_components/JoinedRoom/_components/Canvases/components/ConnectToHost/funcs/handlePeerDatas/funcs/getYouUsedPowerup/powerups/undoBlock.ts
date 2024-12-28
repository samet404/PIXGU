import { usePowerups } from '@/zustand/store'

export const undoBlock = () => {
    usePowerups.getState().setPowerupRunning('rotate')
}