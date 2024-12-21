import { grayLog } from '@/utils/grayLog';
import { usePeers, useSocketIO } from '@/zustand/store';

export const getSecretKey = () =>
    useSocketIO.getState().io!.on('secret-key', ({ userID, secretKey }: ReceviedData) => {
        grayLog('SECRET KEY RECEIVED')
        usePeers.getState().addSecretKey(userID, secretKey)
    })

type ReceviedData = {
    userID: string
    secretKey: string
}