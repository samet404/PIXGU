import { usePowerups } from '@/zustand/store/usePowerups'

export const undoBlock = () => {
    usePowerups.getState().setPowerupRunning('undoBlock')
    usePowerups.getState().setPowerupInActive('undoBlock')
}