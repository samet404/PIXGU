import { grayLog } from '@/utils/grayLog';
import { useHostPeer } from '@/zustand/store/useHostPeer';
import { useSocketIO } from '@/zustand/store/useSocketIO';

export const getSecretKey = () =>
    useSocketIO.getState().io!.on('secret-key', ({ secretKey }: ReceviedData) => {
        grayLog('SECRET KEY RECEIVED')
        useHostPeer.getState().set({ secretKey })
    })

type ReceviedData = {
    userID: string
    secretKey: string
}