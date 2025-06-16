import { usePowerups } from '@/zustand/store/usePowerups'

export const rotate = () => {
    usePowerups.getState().setPowerupIsNotRunning('rotate')
}