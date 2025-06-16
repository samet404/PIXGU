import { usePowerups } from '@/zustand/store/usePowerups'

export const undoBlock = () => {
    usePowerups.getState().setPowerupIsNotRunning('undoBlock')
}