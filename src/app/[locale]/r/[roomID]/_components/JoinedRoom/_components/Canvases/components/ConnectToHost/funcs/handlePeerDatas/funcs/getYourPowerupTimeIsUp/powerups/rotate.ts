import { usePowerups } from '@/zustand/store'

export const rotate = () => {
    usePowerups.getState().setPowerupIsNotRunning('rotate')
}