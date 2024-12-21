import { grayLog } from '@/utils/grayLog';
import { useHostPeer, useSocketIO } from '@/zustand/store';

export const getSecretKey = () =>
    useSocketIO.getState().io!.on('secret-key', ({ secretKey }: ReceviedData) => {
        grayLog('SECRET KEY RECEIVED')
        useHostPeer.getState().set({ secretKey })
    })

type ReceviedData = {
    userID: string
    secretKey: string
}