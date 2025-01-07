import { usePowerups } from '@/zustand/store'

export const undoBlock = () => {
    usePowerups.getState().setPowerupRunning('undoBlock')
    usePowerups.getState().setPowerupInActive('undoBlock')
}